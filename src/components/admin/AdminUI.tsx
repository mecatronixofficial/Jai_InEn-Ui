"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload, FaTrash, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { api } from "@/lib/api";
import { cn } from "@/utils";

/* -------------------------------- Button -------------------------------- */

export function AdminButton({
  children,
  variant = "primary",
  loading,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const v = {
    primary: "bg-maroon-800 text-cream-50 hover:bg-maroon-900",
    outline: "border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50",
    ghost: "text-ink-soft hover:bg-cream-100 hover:text-maroon-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }[variant];
  return (
    <button {...rest} disabled={rest.disabled || loading} className={cn(base, v, className)}>
      {loading ? <FaSpinner className="h-3.5 w-3.5 animate-spin" /> : null}
      {children}
    </button>
  );
}

/* --------------------------------- Card --------------------------------- */

export function AdminCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white border border-cream-200 shadow-soft", className)}>
      {children}
    </div>
  );
}

/* --------------------------------- Field -------------------------------- */

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
      {hint && !error && <span className="block text-xs text-ink-muted mt-1.5">{hint}</span>}
      {error && <span className="block text-xs text-red-600 mt-1.5">{error}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-cream-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/10 transition",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border border-cream-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/10 transition resize-y",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-lg border border-cream-300 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-maroon-700 transition",
        props.className,
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-gold" : "bg-cream-300",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </span>
      {label && <span className="text-sm text-ink-soft">{label}</span>}
    </button>
  );
}

/* --------------------------------- Modal -------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={cn("w-full bg-white rounded-2xl shadow-warm", maxWidth)}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <h3 className="display text-xl font-semibold text-maroon-950">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream-100"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ Confirm dialog -------------------------- */

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ open: false, title: "", message: "" });

  const confirm = (title: string, message: string, onConfirm: () => void) =>
    setState({ open: true, title, message, onConfirm });

  const dialog = (
    <Modal open={state.open} onClose={() => setState((s) => ({ ...s, open: false }))} title={state.title}>
      <p className="text-ink-soft">{state.message}</p>
      <div className="flex justify-end gap-3 mt-6">
        <AdminButton variant="ghost" onClick={() => setState((s) => ({ ...s, open: false }))}>
          Cancel
        </AdminButton>
        <AdminButton
          variant="danger"
          onClick={() => {
            state.onConfirm?.();
            setState((s) => ({ ...s, open: false }));
          }}
        >
          Confirm
        </AdminButton>
      </div>
    </Modal>
  );

  return { confirm, dialog };
}

/* --------------------------------- Toast -------------------------------- */

type Toast = { id: number; kind: "success" | "error"; text: string };
let toastSeq = 0;
const listeners = new Set<(t: Toast) => void>();

export function toast(text: string, kind: "success" | "error" = "success") {
  const t: Toast = { id: ++toastSeq, kind, text };
  listeners.forEach((l) => l(t));
}

export function ToastHost() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const onToast = (t: Toast) => {
      setItems((arr) => [...arr, t]);
      setTimeout(() => setItems((arr) => arr.filter((x) => x.id !== t.id)), 3800);
    };
    listeners.add(onToast);
    return () => {
      listeners.delete(onToast);
    };
  }, []);
  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 shadow-warm text-sm font-medium min-w-[280px]",
              t.kind === "success" ? "bg-white text-ink border-l-4 border-green-600" : "bg-white text-ink border-l-4 border-red-600",
            )}
          >
            {t.kind === "success" ? (
              <FaCheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <FaExclamationCircle className="h-4 w-4 text-red-600" />
            )}
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Image uploader --------------------------- */

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = "Images",
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const res = await api.uploadImage(file);
        uploaded.push(res.url);
      }
      if (multiple) onChange([...value, ...uploaded]);
      else onChange([uploaded[0]]);
      toast(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`);
    } catch (e) {
      toast((e as Error).message || "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-2">
        {label}
      </div>

      {/* Existing images */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-3">
          {value.map((url, i) => (
            <div
              key={url + i}
              className="relative aspect-square overflow-hidden rounded-lg border border-cream-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="absolute top-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-red-600 hover:bg-red-600 hover:text-white transition opacity-0 group-hover:opacity-100 shadow-soft"
                aria-label="Remove"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="block">
        <div
          className={cn(
            "border-2 border-dashed border-cream-300 rounded-lg p-6 text-center cursor-pointer hover:border-maroon-800 hover:bg-cream-50 transition",
            uploading && "opacity-60 pointer-events-none",
          )}
        >
          {uploading ? (
            <>
              <FaSpinner className="h-6 w-6 text-maroon-800 animate-spin mx-auto" />
              <p className="text-sm text-ink-soft mt-2">Uploading…</p>
            </>
          ) : (
            <>
              <FaUpload className="h-6 w-6 text-maroon-800 mx-auto" />
              <p className="text-sm text-ink-soft mt-2">
                {multiple ? "Click to select images" : "Click to upload"}
              </p>
              <p className="text-xs text-ink-muted mt-1">JPG, PNG, WebP up to 10MB</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>
    </div>
  );
}

/* ----------------------------- Stat tile -------------------------------- */

export function StatTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "gold" | "maroon";
}) {
  return (
    <AdminCard className="p-6">
      <div className="text-[10px] uppercase tracking-widest-x text-ink-muted font-semibold">
        {label}
      </div>
      <div
        className={cn(
          "display text-4xl font-semibold mt-2",
          accent === "gold" ? "text-gold-dark" : "text-maroon-900",
        )}
      >
        {value}
      </div>
      {hint && <div className="text-xs text-ink-muted mt-2">{hint}</div>}
    </AdminCard>
  );
}

/* ----------------------------- Empty state ------------------------------ */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <AdminCard className="p-12 text-center">
      <h3 className="display text-2xl text-maroon-950">{title}</h3>
      {description && <p className="text-ink-muted mt-2">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </AdminCard>
  );
}
