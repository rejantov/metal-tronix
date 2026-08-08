"use client";

import { useState, useEffect } from "react";
import { Check, ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { CompanySettings } from "@/lib/types";

const emptyForm = {
  name: "",
  address: "",
  phone: "",
  email: "",
  business_no: "",
};

type Form = typeof emptyForm;

const fields: Array<{ key: keyof Form; label: string; placeholder: string }> = [
  { key: "name", label: "Company name", placeholder: "Metal Tronix" },
  { key: "address", label: "Address", placeholder: "Street address, City" },
  { key: "phone", label: "Phone", placeholder: "+383 00 000 000" },
  { key: "email", label: "Email", placeholder: "info@metaltronix.com" },
  { key: "business_no", label: "Business no.", placeholder: "000000000" },
];

export function CompanySettingsManager() {
  const [form, setForm] = useState<Form>(emptyForm);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("company_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (data) {
        const settings = data as CompanySettings;
        setForm({
          name: settings.name ?? "",
          address: settings.address ?? "",
          phone: settings.phone ?? "",
          email: settings.email ?? "",
          business_no: settings.business_no ?? "",
        });
        setLogoUrl(settings.logo_url);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const ext = file.name.split(".").pop();
      const fileName = `logo-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("company-assets")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("company-assets").getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("company_settings")
        .update({ logo_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (dbError) throw dbError;

      setLogoUrl(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload the logo.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    const { error: dbError } = await supabase
      .from("company_settings")
      .update({
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        business_no: form.business_no.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground">Company details</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These appear in the <span className="text-foreground">FROM</span> column of
        every receipt. Changing them here updates all future receipts.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              {label}
            </label>
            <input
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        ))}

        {/* Logo */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Receipt logo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-32 h-20 rounded-lg border border-border bg-white flex items-center justify-center overflow-hidden shrink-0">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Receipt logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-neutral-400">No logo</span>
              )}
            </div>

            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary cursor-pointer transition-colors">
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ImagePlus className="w-4 h-4" />
              )}
              {logoUrl ? "Replace logo" : "Upload logo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Prints in the top-right corner. A PNG with a transparent or white
            background works best.
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save changes
          </button>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-primary">
              <Check className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
