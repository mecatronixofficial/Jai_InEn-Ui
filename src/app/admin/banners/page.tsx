"use client";

import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaEyeSlash } from "react-icons/fa";

import { api, BannerApi } from "@/lib/api";
import {
  AdminButton, AdminCard, EmptyState, Field, ImageUploader,
  Input, Modal, Select, TextArea, Toggle, toast, useConfirm,
} from "@/components/admin/AdminUI";

interface FormState {
  kind: "hero" | "opening_card" | "about_banner" | "page_banner";
  pageKey: string;
  title: string; highlight: string; subtitle: string; eyebrow: string;
  description: string; image: string; ctaLabel: string; ctaHref: string;
  secondaryLabel: string; secondaryHref: string; badge: string;
  expiresAt: string; order: number; active: boolean;
}

const emptyForm: FormState = {
  kind: "hero",
  pageKey: "about",
  title: "", highlight: "", subtitle: "", eyebrow: "",
  description: "", image: "", ctaLabel: "", ctaHref: "",
  secondaryLabel: "", secondaryHref: "", badge: "",
  expiresAt: "", order: 0, active: true,
};

export default function AdminBannersPage() {
  const [list, setList] = useState<BannerApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BannerApi | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setList(await api.adminBanners());
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate(kind: FormState["kind"] = "hero") {
    setEditing(null);
    setForm({ ...emptyForm, kind });
    setOpen(true);
  }

  function openEdit(b: BannerApi) {
    setEditing(b);
    setForm({
      kind: b.kind,
      pageKey: b.pageKey || "about",
      title: b.title, highlight: b.highlight || "",
      subtitle: b.subtitle || "", eyebrow: b.eyebrow || "",
      description: b.description, image: b.image,
      ctaLabel: b.ctaLabel, ctaHref: b.ctaHref,
      secondaryLabel: b.secondaryLabel || "",
      secondaryHref: b.secondaryHref || "",
      badge: b.badge || "",
      expiresAt: b.expiresAt ? new Date(b.expiresAt).toISOString().slice(0, 16) : "",
      order: b.order, active: b.active,
    });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.image) {
      toast("Banner image is required.", "error");
      return;
    }
    if (form.kind === "opening_card" && (!form.title || !form.description || !form.ctaLabel || !form.ctaHref)) {
      toast("Opening cards require title, description and primary CTA.", "error");
      return;
    }
    setSaving(true);
    try {
      const body: any = {
        kind: form.kind,
        title: form.kind === "opening_card" ? form.title : (form.title || (form.kind === "hero" ? "Homepage banner" : form.kind === "page_banner" ? `${form.pageKey} page banner` : "About page banner")),
        description: form.kind === "opening_card" ? form.description : (form.description || (form.kind === "hero" ? "Homepage image slide" : form.kind === "page_banner" ? `${form.pageKey} page banner image` : "About page banner image")),
        image: form.image,
        ctaLabel: form.kind === "opening_card" ? form.ctaLabel : (form.ctaLabel || "View"),
        ctaHref: form.kind === "opening_card" ? form.ctaHref : (form.ctaHref || (form.kind === "hero" ? "/" : form.kind === "page_banner" ? `/${form.pageKey}` : "/about")),
        order: Number(form.order),
        active: form.active,
      };
      if (form.kind === "page_banner") body.pageKey = form.pageKey;
      if (form.highlight) body.highlight = form.highlight;
      if (form.subtitle) body.subtitle = form.subtitle;
      if (form.eyebrow) body.eyebrow = form.eyebrow;
      if (form.secondaryLabel) body.secondaryLabel = form.secondaryLabel;
      if (form.secondaryHref) body.secondaryHref = form.secondaryHref;
      if (form.badge) body.badge = form.badge;
      if (form.expiresAt) body.expiresAt = new Date(form.expiresAt).toISOString();

      if (editing) {
        await api.updateBanner(editing.id, body);
        toast("Banner updated");
      } else {
        await api.createBanner(body);
        toast("Banner created");
      }
      setOpen(false);
      await load();
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(b: BannerApi) {
    confirm("Delete this banner?", "This cannot be undone.", async () => {
      try {
        await api.deleteBanner(b.id);
        toast("Banner deleted");
        await load();
      } catch (e) {
        toast((e as Error).message, "error");
      }
    });
  }

  const heroes = list.filter((b) => b.kind === "hero");
  const openings = list.filter((b) => b.kind === "opening_card");
  const aboutBanners = list.filter((b) => b.kind === "about_banner");
  const pageBanners = list.filter((b) => b.kind === "page_banner");

  return (
    <div>
      <div className="flex flex-wrap justify-end gap-2 mb-6">
        <AdminButton variant="outline" onClick={() => openCreate("page_banner")}>
          <FaPlus className="h-3 w-3" /> Page Banner
        </AdminButton>
        <AdminButton variant="outline" onClick={() => openCreate("about_banner")}>
          <FaPlus className="h-3 w-3" /> About Banner
        </AdminButton>
        <AdminButton variant="outline" onClick={() => openCreate("opening_card")}>
          <FaPlus className="h-3 w-3" /> Opening Card
        </AdminButton>
        <AdminButton onClick={() => openCreate("hero")}>
          <FaPlus className="h-3 w-3" /> Hero Slide
        </AdminButton>
      </div>

      {loading ? (
        <AdminCard className="p-16 grid place-items-center">
          <FaSpinner className="h-7 w-7 text-gray-800 animate-spin" />
        </AdminCard>
      ) : list.length === 0 ? (
        <EmptyState
          title="No banners yet"
          description="Hero slides drive the homepage carousel. Opening cards show as popups on first visit."
          action={<AdminButton onClick={() => openCreate("hero")}><FaPlus className="h-3 w-3" /> Add Hero Slide</AdminButton>}
        />
      ) : (
        <div className="space-y-10">
          {[
            { title: "Hero Slides", items: heroes },
            { title: "About Page Banner", items: aboutBanners },
            { title: "Public Page Banners", items: pageBanners },
            { title: "Opening Card (Popup)", items: openings },
          ].map(({ title, items }) => (
            <div key={title}>
              <div className="display text-2xl font-semibold text-gray-950 mb-4">{title}</div>
              {items.length === 0 ? (
                <p className="text-sm text-ink-muted">None yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {items.map((b) => (
                    <AdminCard key={b.id} className="overflow-hidden">
                      <div className="relative aspect-[16/9]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.image} alt={b.title} className="absolute inset-0 h-full w-full object-cover" />
                        {b.kind === "opening_card" && <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />}
                        {b.kind === "opening_card" && <div className="absolute bottom-3 left-3 right-3 text-cream-50">
                          {b.eyebrow && (
                            <div className="text-[9px] uppercase tracking-widest-x text-gold-light font-semibold">
                              {b.eyebrow}
                            </div>
                          )}
                          <div className="display text-xl font-semibold leading-tight">
                            {b.title} {b.highlight && <span className="italic text-gold-light">{b.highlight}</span>}
                          </div>
                        </div>}
                        {!b.active && (
                          <div className="absolute top-3 right-3 rounded-full bg-ink/80 text-cream-50 px-2.5 py-1 text-[9px] uppercase tracking-widest-x font-bold flex items-center gap-1">
                            <FaEyeSlash className="h-2.5 w-2.5" /> Hidden
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="text-xs text-ink-muted">
                          Order #{b.order} · → {b.ctaHref}
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(b)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-cream-100 hover:text-gray-800" aria-label="Edit">
                            <FaEdit className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDelete(b)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                            <FaTrash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </AdminCard>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Banner" : `Add ${form.kind === "hero" ? "Hero Slide" : form.kind === "about_banner" ? "About Banner" : form.kind === "page_banner" ? "Page Banner" : "Opening Card"}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <ImageUploader
            value={form.image ? [form.image] : []}
            onChange={(urls) => setForm({ ...form, image: urls[0] || "" })}
            label={form.kind === "hero" ? "Slider Image" : form.kind === "about_banner" ? "About Banner Image" : form.kind === "page_banner" ? "Page Banner Image" : "Banner Image"}
          />

          <Field label="Type">
            <Select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as any })}>
              <option value="hero">Hero Slide (homepage carousel)</option>
              <option value="about_banner">About Page Banner</option>
              <option value="page_banner">Public Page Banner</option>
              <option value="opening_card">Opening Card (popup on first visit)</option>
            </Select>
          </Field>

          {form.kind === "hero" && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              Homepage slides show only the uploaded image. Use matching 16:9 images for the best 3D carousel effect.
            </div>
          )}

          {form.kind === "about_banner" && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              This image appears behind the About page heading. A wide landscape image works best.
            </div>
          )}

          {form.kind === "page_banner" && (
            <Field label="Public Page" required>
              <Select value={form.pageKey} onChange={(e) => setForm({ ...form, pageKey: e.target.value })}>
                <option value="about">About</option>
                <option value="products">Products</option>
                <option value="sustainability">Sustainability</option>
                <option value="certifications">Certifications</option>
                <option value="journal">Journal / Blog</option>
                <option value="contact">Contact</option>
                <option value="categories">Collections / Categories</option>
                <option value="category">Category Details</option>
                <option value="product">Product Details</option>
                <option value="blog-article">Blog Details</option>
                <option value="faq">FAQ</option>
                <option value="testimonials">Testimonials</option>
                <option value="wishlist">Wishlist</option>
                <option value="care-guide">Care Guide</option>
              </Select>
            </Field>
          )}

          {form.kind === "opening_card" && <>
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Highlight (italic accent)">
              <Input value={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.value })} />
            </Field>
            <Field label="Subtitle (opening card)">
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </Field>
          </div>

          <Field label="Eyebrow">
            <Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} placeholder="New Collection · Festival Sale · ..." />
          </Field>

          <Field label="Description" required>
            <TextArea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary CTA Label" required>
              <Input value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} />
            </Field>
            <Field label="Primary CTA URL" required>
              <Input value={form.ctaHref} onChange={(e) => setForm({ ...form, ctaHref: e.target.value })} placeholder="/products or https://..." />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Secondary CTA Label">
              <Input value={form.secondaryLabel} onChange={(e) => setForm({ ...form, secondaryLabel: e.target.value })} />
            </Field>
            <Field label="Secondary CTA URL">
              <Input value={form.secondaryHref} onChange={(e) => setForm({ ...form, secondaryHref: e.target.value })} />
            </Field>
          </div>

          </>}

          <div className={form.kind === "hero" ? "grid sm:grid-cols-2 gap-4" : "grid sm:grid-cols-3 gap-4"}>
            {form.kind === "opening_card" && <Field label="Badge (opening card)">
              <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Limited Time" />
            </Field>}
            {form.kind === "opening_card" && <Field label="Expires At">
              <Input type="datetime-local" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
            </Field>}
            <Field label="Display Order">
              <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
          </div>

          <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />

          <div className="flex justify-end gap-3 pt-4 border-t border-cream-200">
            <AdminButton variant="ghost" onClick={() => setOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={handleSave} loading={saving}>
              {editing ? "Save Changes" : "Create Banner"}
            </AdminButton>
          </div>
        </div>
      </Modal>

      {dialog}
    </div>
  );
}
