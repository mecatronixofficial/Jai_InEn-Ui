"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaCertificate,
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
  description: string;
  issuer: string;
  issuedAt: string;
  order: number;
  active: boolean;
}

const emptyForm: FormState = {
  title: "",
  image: "",
  description: "",
  issuer: "",
  issuedAt: "",
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
      title: certificate.title,
      image: certificate.image,
      description: certificate.description || "",
      issuer: certificate.issuer || "",
      issuedAt: certificate.issuedAt
        ? new Date(certificate.issuedAt).toISOString().slice(0, 10)
        : "",
      order: certificate.order,
      active: certificate.active,
    });
    setOpen(true);
  }

  async function handleSave() {
    const title = form.title.trim();
    if (!title) {
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
        title,
        image: form.image,
        description: form.description.trim() || undefined,
        issuer: form.issuer.trim() || undefined,
        issuedAt: form.issuedAt || undefined,
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
      `Delete "${certificate.title}"?`,
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
          description="Upload your first certificate and enter the title visitors should see."
          action={
            <AdminButton onClick={openCreate}>
              <FaPlus className="h-3 w-3" /> Add Certificate
            </AdminButton>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              <div className="p-5">
                <div className="text-[10px] font-semibold uppercase tracking-widest-x text-gold-dark">
                  {certificate.issuer || "Certificate"}
                </div>
                <h3 className="display mt-2 text-xl font-semibold text-gray-950">
                  {certificate.title}
                </h3>
                <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
                  <span className="text-xs text-ink-muted">
                    Display order #{certificate.order}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(certificate)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-cream-100 hover:text-gray-800"
                      aria-label={`Edit ${certificate.title}`}
                    >
                      <FaEdit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(certificate)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${certificate.title}`}
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

          <Field
            label="Certificate Title"
            required
            hint="Enter the public title manually. Uploading a file will not fill this field."
          >
            <Input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Enter certificate title"
              autoComplete="off"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Issuing Organisation">
              <Input
                value={form.issuer}
                onChange={(event) =>
                  setForm((current) => ({ ...current, issuer: event.target.value }))
                }
                placeholder="Optional"
              />
            </Field>
            <Field label="Issue Date">
              <Input
                type="date"
                value={form.issuedAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, issuedAt: event.target.value }))
                }
              />
            </Field>
          </div>

          <Field label="Description">
            <TextArea
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Optional details shown below the certificate"
            />
          </Field>

          <Field label="Display Order">
            <Input
              type="number"
              min={0}
              value={form.order}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  order: Number(event.target.value),
                }))
              }
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
