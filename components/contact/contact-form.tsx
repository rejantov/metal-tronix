"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, CheckCircle, Paperclip, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  material: "",
  quantity: "",
  message: "",
};

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("files", f));

      const response = await fetch("/api/send-quote", {
        method: "POST",
        body: fd,
        // Do NOT set Content-Type — browser sets it with the correct multipart boundary
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to send quote request");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to send. Please try again or email us at metal.tronixx@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...incoming.filter((f) => !existing.has(f.name + f.size))];
    });
    e.target.value = ""; // reset so same file can be re-added after removal
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t.contact.form.success.split("!")[0]}!
        </h3>
        <p className="text-muted-foreground mb-6">{t.contact.form.success.split("!")[1]}</p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData(emptyForm);
            setFiles([]);
          }}
          variant="outline"
          className="border-primary/30 text-foreground hover:bg-primary/10"
        >
          {t.contact.form.submit}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            {t.contact.form.name} *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={t.contact.form.namePlaceholder}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            {t.contact.form.company}
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder={t.contact.form.companyPlaceholder}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {t.contact.form.email} *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.form.emailPlaceholder}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            {t.contact.form.phone}
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.contact.form.phonePlaceholder}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t.contact.form.message.split(" ")[0]} Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
              {t.contact.form.service} *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{t.contact.form.servicePlaceholder}</option>
              <option value="laser-cutting">{t.contact.form.serviceOptions.laserCutting}</option>
              <option value="press-brake">{t.contact.form.serviceOptions.brakeForming}</option>
              <option value="tube-cutting">{t.contact.form.serviceOptions.tubeCutting}</option>
              <option value="full-fabrication">{t.contact.form.serviceOptions.customFab}</option>
              <option value="assembly">{t.contact.form.serviceOptions.assembly}</option>
              <option value="other">{t.contact.form.serviceOptions.other}</option>
            </select>
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-foreground mb-2">
              {t.contact.form.material}
            </label>
            <select
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{t.contact.form.materialPlaceholder}</option>
              <option value="carbon-steel">{t.contact.form.materialOptions.carbonSteel}</option>
              <option value="stainless">{t.contact.form.materialOptions.stainlessSteel}</option>
              <option value="aluminum">{t.contact.form.materialOptions.aluminum}</option>
              <option value="ar-plate">{t.contact.form.materialOptions.arPlate}</option>
              <option value="copper">{t.contact.form.materialOptions.copper}</option>
              <option value="other">{t.contact.form.materialOptions.other}</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-2">
              {t.contact.form.quantity}
            </label>
            <select
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{t.contact.form.quantityPlaceholder}</option>
              <option value="prototype">{t.contact.form.quantityOptions.prototype}</option>
              <option value="small">{t.contact.form.quantityOptions.small}</option>
              <option value="medium">{t.contact.form.quantityOptions.medium}</option>
              <option value="production">{t.contact.form.quantityOptions.production}</option>
              <option value="Rate Production">{t.contact.form.quantityOptions.rateProduction}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {t.contact.form.message} *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={t.contact.form.messagePlaceholder}
          className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none focus:border-primary"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Attachments{" "}
          <span className="text-muted-foreground font-normal">
            (DXF, DWG, STEP, PDF, images — any format)
          </span>
        </label>

        <label className="block cursor-pointer">
          <div className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center gap-3 bg-card/50">
            <Paperclip className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              Click to attach files — or drag &amp; drop
            </span>
          </div>
          <input type="file" multiple onChange={handleFileChange} className="sr-only" />
        </label>

        {files.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card border border-border text-sm"
              >
                <Paperclip className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="flex-1 truncate text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatSize(file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="flex-shrink-0 text-muted-foreground hover:text-red-400 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity h-12 shadow-lg shadow-primary/25"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            {t.contact.form.submitting}
          </>
        ) : (
          <>
            <Send className="mr-2 w-4 h-4" />
            {t.contact.form.submit}
          </>
        )}
      </Button>
    </form>
  );
}
