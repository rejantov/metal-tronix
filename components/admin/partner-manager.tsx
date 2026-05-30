"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Loader2, Plus, ChevronUp, ChevronDown, ImagePlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Partner } from "@/lib/types";

const emptyForm = { name: "", initials: "" };

export function PartnerManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setPartners(data);
    setLoading(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Company name is required."); return; }
    if (form.initials.trim().length !== 2) { setError("Initials must be exactly 2 letters."); return; }

    setError("");
    setUploading(true);

    try {
      let logoUrl: string | null = null;

      if (logoFile) {
        const ext = logoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("partner-logos")
          .upload(fileName, logoFile);
        if (uploadError) throw uploadError;
        const {
          data: { publicUrl },
        } = supabase.storage.from("partner-logos").getPublicUrl(fileName);
        logoUrl = publicUrl;
      }

      const nextOrder =
        partners.length > 0 ? Math.max(...partners.map((p) => p.display_order)) + 1 : 1;

      const { data, error: dbError } = await supabase
        .from("partners")
        .insert({
          name: form.name.trim(),
          initials: form.initials.toUpperCase(),
          logo_url: logoUrl,
          display_order: nextOrder,
        })
        .select()
        .single();
      if (dbError) throw dbError;

      setPartners((prev) => [...prev, data]);
      setForm(emptyForm);
      setLogoFile(null);
      setLogoPreview(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add partner.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (partner: Partner) => {
    if (!confirm(`Remove "${partner.name}"?`)) return;

    if (partner.logo_url) {
      const fileName = partner.logo_url.split("/").pop();
      if (fileName) await supabase.storage.from("partner-logos").remove([fileName]);
    }

    await supabase.from("partners").delete().eq("id", partner.id);
    const remaining = partners.filter((p) => p.id !== partner.id);
    const reordered = remaining.map((p, i) => ({ ...p, display_order: i + 1 }));
    setPartners(reordered);

    // Persist updated display_order for all remaining
    await Promise.all(
      reordered.map((p) =>
        supabase.from("partners").update({ display_order: p.display_order }).eq("id", p.id)
      )
    );
  };

  const movePartner = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= partners.length) return;

    const updated = [...partners];
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    const reordered = updated.map((p, i) => ({ ...p, display_order: i + 1 }));
    setPartners(reordered);

    await supabase
      .from("partners")
      .update({ display_order: reordered[index].display_order })
      .eq("id", reordered[index].id);
    await supabase
      .from("partners")
      .update({ display_order: reordered[targetIndex].display_order })
      .eq("id", reordered[targetIndex].id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Add Partner Form */}
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold text-foreground mb-6">Add New Partner</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card border border-border rounded-xl p-6"
        >
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Logo{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <label className="inline-block cursor-pointer">
              {logoPreview ? (
                <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-border">
                  <Image src={logoPreview} alt="Logo preview" fill className="object-contain" />
                  <div className="absolute inset-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white font-medium text-center px-1">Change</span>
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors bg-background/50">
                  <ImagePlus className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="sr-only"
              />
            </label>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Company Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. SteelForge Industries"
            />
          </div>

          {/* Initials */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Initials *{" "}
              <span className="text-muted-foreground font-normal">(2 letters, shown if no logo)</span>
            </label>
            <input
              type="text"
              value={form.initials}
              onChange={(e) =>
                setForm((f) => ({ ...f, initials: e.target.value.slice(0, 2) }))
              }
              maxLength={2}
              className="w-24 h-10 px-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-widest font-mono"
              placeholder="SF"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">Partner added!</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full h-10 bg-gradient-to-r from-primary to-accent text-white rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add Partner
              </>
            )}
          </button>
        </form>
      </div>

      {/* Partners List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Current Partners{" "}
          <span className="text-muted-foreground font-normal text-base">({partners.length})</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Partners are displayed on the homepage in the order shown below.
        </p>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-xl">
            No partners yet.
          </div>
        ) : (
          <div className="space-y-3">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl"
              >
                {/* Logo / Initials */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm font-bold text-primary">{partner.initials}</span>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{partner.name}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => movePartner(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-25 transition-colors rounded-md hover:bg-secondary"
                    aria-label="Move up"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => movePartner(index, "down")}
                    disabled={index === partners.length - 1}
                    className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-25 transition-colors rounded-md hover:bg-secondary"
                    aria-label="Move down"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner)}
                    className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10 ml-1"
                    aria-label={`Remove ${partner.name}`}
                    title="Remove partner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
