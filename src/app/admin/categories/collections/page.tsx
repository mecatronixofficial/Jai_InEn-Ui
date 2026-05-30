"use client";

import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaToggleOn, FaToggleOff } from "react-icons/fa";

import { api, CollectionApi } from "@/lib/api";
import {
  AdminButton, AdminCard, EmptyState, Field, ImageUploader,
  Input, Modal, TextArea, Toggle, toast, useConfirm,
} from "@/components/admin/AdminUI";
import { cn } from "@/utils";

interface FormState {
  name: string;
  slug: string;
  description: string;
  image: string;
  badge: string;
  itemCount: number;
  order: number;
  active: boolean;
}

const emptyForm: FormState = {
  name: "", slug: "", description: "", image: "",
  badge: "", itemCount: 0, order: 0, active: true,
};

export default function AdminCollectionsPage() {
  const [list, setList] = useState<CollectionApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CollectionApi | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setList(await api.adminCollections());
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(c: CollectionApi) {
    setEditing(c);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      badge: c.badge || "",
      itemCount: c.itemCount,
      order: c.order,
      active: c.active,
    });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.description || !form.image) {
      toast("Name, description and image are required.", "error");
      return;
    }
    setSaving(true);
    try {
      const body: any = {
        name: form.name,
        description: form.description,
        image: form.image,
        itemCount: Number(form.itemCount),
        order: Number(form.order),
        active: form.active,
      };
      if (form.slug) body.slug = form.slug;
      if (form.badge) body.badge = form.badge;

      if (editing) {
        await api.updateCollection(editing.id, body);
        toast("Collection updated");
      } else {
        await api.createCollection(body);
        toast("Collection created");
      }
      setOpen(false);
      await load();
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function quickToggle(c: CollectionApi) {
    try {
      await api.updateCollection(c.id, { active: !c.active });
      toast(`Collection ${!c.active ? "activated" : "deactivated"}`);
      await load();
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  function handleDelete(c: CollectionApi) {
    confirm(`Delete collection "${c.name}"?`, "This cannot be undone.", async () => {
      try {
        await api.deleteCollection(c.id);
        toast("Collection deleted");
        await load();
      } catch (e) {
        toast((e as Error).message, "error");
      }
    });
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AdminButton onClick={openCreate}>
          <FaPlus className="h-3 w-3" /> New Collection
        </AdminButton>
      </div>

      {loading ? (
        <AdminCard className="p-16 grid place-items-center">
          <FaSpinner className="h-7 w-7 text-maroon-800 animate-spin" />
        </AdminCard>
      ) : list.length === 0 ? (
        <EmptyState
          title="No collections yet"
          description="Group your products into themed collections for the storefront."
          action={<AdminButton onClick={openCreate}><FaPlus className="h-3 w-3" /> New Collection</AdminButton>}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c) => (
            <AdminCard key={c.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 to-transparent" />
                {c.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-gold text-maroon-950 px-2.5 py-1 text-[9px] uppercase tracking-widest-x font-bold">
                    {c.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="display text-xl font-semibold text-cream-50 leading-tight">{c.name}</h3>
                  <p className="text-xs text-cream-100/80 mt-0.5">{c.itemCount} items</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-ink-soft line-clamp-2 flex-1">{c.description}</p>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-cream-200">
                  <button
                    type="button"
                    onClick={() => quickToggle(c)}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-semibold transition",
                      c.active ? "text-green-600 hover:text-green-800" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {c.active
                      ? <FaToggleOn className="h-4 w-4" />
                      : <FaToggleOff className="h-4 w-4" />}
                    {c.active ? "Active" : "Inactive"}
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(c)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-cream-100 hover:text-maroon-800"
                      aria-label="Edit"
                    >
                      <FaEdit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete"
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
        title={editing ? "Edit Collection" : "New Collection"}
      >
        <div className="space-y-5">
          <ImageUploader
            value={form.image ? [form.image] : []}
            onChange={(urls) => setForm({ ...form, image: urls[0] || "" })}
            label="Collection Image"
          />

          <Field label="Name" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Slug" hint="Auto-generated if blank">
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </Field>
            <Field label="Badge" hint="e.g. Heritage, Seasonal">
              <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
            </Field>
          </div>

          <Field label="Description" required>
            <TextArea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Item Count">
              <Input type="number" min={0} value={form.itemCount} onChange={(e) => setForm({ ...form, itemCount: Number(e.target.value) })} />
            </Field>
            <Field label="Display Order">
              <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
          </div>

          <div className="flex gap-6 pt-2 border-t border-cream-200">
            <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active (visible on site)" />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-cream-200">
            <AdminButton variant="ghost" onClick={() => setOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editing ? "Save Changes" : "Create Collection"}
            </AdminButton>
          </div>
        </div>
      </Modal>

      {dialog}
    </div>
  );
}
