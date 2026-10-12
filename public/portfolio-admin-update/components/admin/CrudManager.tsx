"use client";

import { useCallback, useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import Markdown from "@/components/Markdown";

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "markdown" | "list" | "number" | "checkbox" | "image" | "select";
  sep?: "," | "\n"; // for list fields
  hint?: string;
  required?: boolean;
  options?: string[]; // for select
};

type Row = { id: string; [key: string]: unknown };
type FormValues = Record<string, string | boolean>;

type Props = {
  table: string;
  title: string;
  itemLabel: string;
  fields: Field[];
  orderBy: string;
  ascending?: boolean;
  primaryField: string;
  secondaryField?: string;
  newDefaults?: Record<string, unknown>;
  transform?: (payload: Record<string, unknown>) => Record<string, unknown>;
};

const inputCls =
  "w-full rounded-md border border-ink-border bg-ink px-3 py-2 font-body text-sm text-paper placeholder:text-paper-faint focus:border-indigo focus:outline-none";
const btnPrimary =
  "rounded-md bg-indigo px-4 py-2 font-body text-sm font-medium text-ink transition-colors hover:bg-indigo-dim disabled:opacity-50";
const btnGhost =
  "rounded-md border border-ink-border px-4 py-2 font-body text-sm text-paper transition-colors hover:border-paper-faint disabled:opacity-50";

function toForm(fields: Field[], row: Row | null, defaults?: Record<string, unknown>): FormValues {
  const out: FormValues = {};
  for (const f of fields) {
    const raw = row ? row[f.name] : defaults?.[f.name];
    if (f.type === "checkbox") out[f.name] = Boolean(raw);
    else if (f.type === "list")
      out[f.name] = Array.isArray(raw) ? raw.join(f.sep === "," ? ", " : "\n") : "";
    else out[f.name] = raw === null || raw === undefined ? "" : String(raw);
  }
  return out;
}

function toPayload(fields: Field[], values: FormValues): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === "checkbox") out[f.name] = Boolean(v);
    else if (f.type === "number") out[f.name] = Number(v) || 0;
    else if (f.type === "list")
      out[f.name] = String(v)
        .split(f.sep === "," ? "," : /\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    else if (f.type === "markdown") out[f.name] = String(v);
    else {
      const s = String(v).trim();
      out[f.name] = s === "" && !f.required ? null : s;
    }
  }
  return out;
}

export default function CrudManager({
  table,
  title,
  itemLabel,
  fields,
  orderBy,
  ascending = true,
  primaryField,
  secondaryField,
  newDefaults,
  transform,
}: Props) {
  const sb = getBrowserClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<"new" | Row | null>(null);
  const [values, setValues] = useState<FormValues>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);

  const load = useCallback(async () => {
    if (!sb) return;
    setLoading(true);
    const { data, error: err } = await sb.from(table).select("*").order(orderBy, { ascending });
    if (err) setError(err.message);
    else {
      setRows((data ?? []) as Row[]);
      setError("");
    }
    setLoading(false);
  }, [sb, table, orderBy, ascending]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setValues(toForm(fields, null, newDefaults));
    setEditing("new");
    setPreview(false);
    setError("");
  }

  function startEdit(row: Row) {
    setValues(toForm(fields, row));
    setEditing(row);
    setPreview(false);
    setError("");
  }

  function setValue(name: string, value: string | boolean) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function save() {
    if (!sb || !editing) return;
    for (const f of fields) {
      if (f.required && !String(values[f.name] ?? "").trim()) {
        setError(`${f.label} is required.`);
        return;
      }
    }
    setSaving(true);
    setError("");
    let payload = toPayload(fields, values);
    if (transform) payload = transform(payload);

    if (editing === "new") {
      const { error: err } = await sb.from(table).insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error: err } = await sb
        .from(table)
        .update(payload)
        .eq("id", editing.id)
        .select("id");
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
      if (!data || data.length === 0) {
        setError("Not allowed. Make sure you are logged in with the admin email set in setup.sql.");
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    setEditing(null);
    await load();
  }

  async function remove(row: Row) {
    if (!sb) return;
    if (!window.confirm(`Delete this ${itemLabel}? This cannot be undone.`)) return;
    const { data, error: err } = await sb.from(table).delete().eq("id", row.id).select("id");
    if (err) setError(err.message);
    else if (!data || data.length === 0)
      setError("Not allowed. Make sure you are logged in with the admin email set in setup.sql.");
    else {
      setError("");
      await load();
    }
  }

  async function upload(fieldName: string, file: File) {
    if (!sb) return;
    setUploading(true);
    setError("");
    const ext = (file.name.split(".").pop() ?? "png").toLowerCase();
    const base =
      file.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "image";
    const path = `${table}/${Date.now()}-${base}.${ext}`;
    const { error: err } = await sb.storage
      .from("images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (err) {
      setError(err.message);
      setUploading(false);
      return;
    }
    const { data } = sb.storage.from("images").getPublicUrl(path);
    setValue(fieldName, data.publicUrl);
    setUploading(false);
  }

  if (!sb) {
    return (
      <p className="font-body text-sm text-paper-muted">
        Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
      </p>
    );
  }

  // ---------- Form view ----------
  if (editing) {
    return (
      <div>
        <h2 className="font-display text-xl font-semibold text-paper">
          {editing === "new" ? `New ${itemLabel}` : `Edit ${itemLabel}`}
        </h2>

        <div className="mt-6 space-y-5">
          {fields.map((f) => {
            const id = `${table}-${f.name}`;
            const label = (
              <label htmlFor={id} className="mb-1.5 block font-body text-sm font-medium text-paper">
                {f.label}
                {f.required && <span className="text-indigo"> *</span>}
              </label>
            );
            const hint =
              f.hint ??
              (f.type === "list"
                ? f.sep === ","
                  ? "Separate with commas."
                  : "One per line."
                : undefined);

            return (
              <div key={f.name}>
                {f.type !== "checkbox" && label}

                {(f.type === "text" || f.type === "number") && (
                  <input
                    id={id}
                    type={f.type === "number" ? "number" : "text"}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    className={inputCls}
                  />
                )}

                {(f.type === "textarea" || f.type === "list") && (
                  <textarea
                    id={id}
                    rows={f.type === "list" && f.sep === "," ? 3 : 5}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    className={inputCls}
                  />
                )}

                {f.type === "markdown" && (
                  <div>
                    <div className="mb-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`rounded px-3 py-1 font-body text-xs ${!preview ? "bg-ink-raised text-paper" : "text-paper-muted"}`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`rounded px-3 py-1 font-body text-xs ${preview ? "bg-ink-raised text-paper" : "text-paper-muted"}`}
                      >
                        Preview
                      </button>
                    </div>
                    {preview ? (
                      <div className="article-body min-h-[200px] rounded-md border border-ink-border bg-ink p-5">
                        <Markdown>{String(values[f.name] ?? "")}</Markdown>
                      </div>
                    ) : (
                      <textarea
                        id={id}
                        rows={20}
                        value={String(values[f.name] ?? "")}
                        onChange={(e) => setValue(f.name, e.target.value)}
                        className={`${inputCls} font-mono leading-relaxed`}
                      />
                    )}
                  </div>
                )}

                {f.type === "select" && (
                  <select
                    id={id}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    className={inputCls}
                  >
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                )}

                {f.type === "checkbox" && (
                  <label className="flex items-center gap-3 font-body text-sm text-paper">
                    <input
                      type="checkbox"
                      checked={Boolean(values[f.name])}
                      onChange={(e) => setValue(f.name, e.target.checked)}
                      className="h-4 w-4"
                    />
                    {f.label}
                  </label>
                )}

                {f.type === "image" && (
                  <div className="space-y-3">
                    {String(values[f.name] ?? "") && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={String(values[f.name])}
                        alt="Preview"
                        className="max-h-44 rounded-md border border-ink-border"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) upload(f.name, file);
                      }}
                      className="block font-body text-sm text-paper-muted"
                    />
                    {uploading && <p className="font-body text-xs text-paper-muted">Uploading…</p>}
                    <input
                      id={id}
                      type="text"
                      placeholder="or paste an image URL / path like /projects/ecommerce.png"
                      value={String(values[f.name] ?? "")}
                      onChange={(e) => setValue(f.name, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                )}

                {hint && <p className="mt-1.5 font-body text-xs text-paper-faint">{hint}</p>}
              </div>
            );
          })}
        </div>

        {error && <p className="mt-5 font-body text-sm text-red-400">{error}</p>}

        <div className="mt-8 flex gap-3">
          <button onClick={save} disabled={saving || uploading} className={btnPrimary}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={() => setEditing(null)} disabled={saving} className={btnGhost}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ---------- List view ----------
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-paper">{title}</h2>
        <button onClick={startNew} className={btnPrimary}>
          + New {itemLabel}
        </button>
      </div>

      {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}

      <div className="mt-6 divide-y divide-ink-border rounded-lg border border-ink-border bg-ink-surface">
        {loading && <p className="p-5 font-body text-sm text-paper-muted">Loading…</p>}
        {!loading && rows.length === 0 && (
          <p className="p-5 font-body text-sm text-paper-muted">Nothing here yet.</p>
        )}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-body text-sm font-medium text-paper">
                {String(row[primaryField] ?? "")}
                {row.published === false && (
                  <span className="ml-2 rounded bg-ink-raised px-2 py-0.5 font-mono text-xs text-paper-muted">
                    draft
                  </span>
                )}
              </p>
              {secondaryField && row[secondaryField] ? (
                <p className="mt-0.5 truncate font-body text-xs text-paper-faint">
                  {Array.isArray(row[secondaryField])
                    ? (row[secondaryField] as string[]).join(", ")
                    : String(row[secondaryField])}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => startEdit(row)} className={btnGhost}>
                Edit
              </button>
              <button
                onClick={() => remove(row)}
                className="rounded-md border border-red-400/30 px-4 py-2 font-body text-sm text-red-400 transition-colors hover:border-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
