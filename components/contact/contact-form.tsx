"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    material: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send quote request");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send quote request. Please try again or email us directly at metal.tronixx@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-xl bg-gradient-to-br from-card to-primary/5 border border-primary/20 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t.contact.form.success.split("!")[0]}!
        </h3>
        <p className="text-muted-foreground mb-6">
          {t.contact.form.success.split("!")[1]}
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              phone: "",
              projectType: "",
              material: "",
              quantity: "",
              message: "",
            });
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
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
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
          <label
            htmlFor="company"
            className="block text-sm font-medium text-foreground mb-2"
          >
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
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
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
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
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-foreground mb-2"
            >
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
            <label
              htmlFor="material"
              className="block text-sm font-medium text-foreground mb-2"
            >
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
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-foreground mb-2"
            >
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
              <option value="kanban">{t.contact.form.quantityOptions.kanban}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-2"
        >
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

      {/* File Upload Note */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          {t.contact.form.fileNote}
        </p>
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
