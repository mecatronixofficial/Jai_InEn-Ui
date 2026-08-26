"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaEdit,
  FaEyeSlash,
  FaPlus,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";

import { api, type CertificateApi } from "@/lib/api";
import {
  AdminButton,
  AdminCard,
  EmptyState,
  Field,
  ImageUploader,
  Input,
  Modal,
  TextArea,
  Toggle,
  toast,
  useConfirm,
} from "@/components/admin/AdminUI";

interface FormState {
  title: string;
  image: string;
  year: string;
  description: string;
  order: number;
  active: boolean;
}

const emptyForm: FormState = {
  title: "",
  image: "",
  year: "",
  description: "",
  order: 0,
  active: true,
};

export default function AdminCertificationsPage() {
  const [list, setList] = useState<CertificateApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CertificateApi | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setList(await api.adminCertificates());
    } catch (error) {
      toast((error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm });
    setOpen(true);
  }

  function openEdit(certificate: CertificateApi) {
    setEditing(certificate);
    setForm({
      title: certificate.title || "",
      image: certificate.image,
      year: certificate.issuedAt ? String(new Date(certificate.issuedAt).getFullYear()) : "",
      description: certificate.description || "",
      order: certificate.order,
      active: certificate.active,
    });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast("Enter a certificate title.", "error");
      return;
    }
    if (!form.image) {
      toast("Upload a certificate image.", "error");
      return;
    }

    setSaving(true);
    try {
      const body = {
        title: form.title.trim(),
        image: form.image,
        description: form.description.trim() || undefined,
        issuedAt: form.year ? `${form.year}-01-01` : undefined,
        order: Number(form.order),
        active: form.active,
      };

      if (editing) {
        await api.updateCertificate(editing.id, body);
        toast("Certificate updated");
      } else {
        await api.createCertificate(body);
        toast("Certificate added");
      }

      setOpen(false);
      await load();
    } catch (error) {
      toast((error as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(certificate: CertificateApi) {
    confirm(
      "Delete this certificate?",
      "This removes the certificate from the website and cannot be undone.",
      async () => {
        try {
          await api.deleteCertificate(certificate.id);
          toast("Certificate deleted");
          await load();
        } catch (error) {
          toast((error as Error).message, "error");
        }
      },
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <AdminButton onClick={openCreate}>
          <FaPlus className="h-3 w-3" /> Add Certificate
        </AdminButton>
      </div>

      {loading ? (
        <AdminCard className="grid place-items-center p-16">
          <FaSpinner className="h-7 w-7 animate-spin text-gray-800" />
        </AdminCard>
      ) : list.length === 0 ? (
        <EmptyState
          title="No certificates yet"
          description="Upload your first certificate image. No additional text is required."
          action={
            <AdminButton onClick={openCreate}>
              <FaPlus className="h-3 w-3" /> Add Certificate
            </AdminButton>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {list.map((certificate) => (
            <AdminCard key={certificate.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-cream-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="absolute inset-0 h-full w-full object-contain p-3"
                />
                {!certificate.active && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest-x text-cream-50">
                    <FaEyeSlash className="h-2.5 w-2.5" /> Hidden
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-950">{certificate.title}</div>
                    <div className="text-[10px] text-ink-muted">Order #{certificate.order}</div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(certificate)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-cream-100 hover:text-gray-800"
                      aria-label="Edit certificate"
                    >
                      <FaEdit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(certificate)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete certificate"
                    >
                      <FaTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Certificate" : "Add Certificate"}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <ImageUploader
            value={form.image ? [form.image] : []}
            onChange={(urls) =>
              setForm((current) => ({
                ...current,
                image: urls[0] || "",
              }))
            }
            label="Certificate Image"
          />

          <Field label="Certificate Title" required>
            <Input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Certificate title"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Year">
              <Input
                type="number"
                min={1900}
                max={2100}
                value={form.year}
                onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
                placeholder="2026"
              />
            </Field>
            <Field label="Display Order" hint="Lower numbers appear first.">
              <Input
                type="number"
                min={0}
                value={form.order}
                onChange={(event) => setForm((current) => ({ ...current, order: Number(event.target.value) }))}
              />
            </Field>
          </div>

          <Field label="Description">
            <TextArea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Description shown on the back of the card"
            />
          </Field>

          <Toggle
            checked={form.active}
            onChange={(active) => setForm((current) => ({ ...current, active }))}
            label="Visible on certifications page"
          />

          <div className="flex justify-end gap-3 border-t border-cream-200 pt-4">
            <AdminButton variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editing ? "Save Changes" : "Add Certificate"}
            </AdminButton>
          </div>
        </div>
      </Modal>

      {dialog}
    </div>
  );
}
