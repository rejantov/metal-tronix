"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Loader2, Plus, ImagePlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { DbProduct } from "@/lib/types";

const CATEGORIES = [
  "Laser Cutting",
  "Press Brake Forming",
  "Tube & Pipe",
  "Custom Fabrication",
  "Assemblies",
];

const emptyForm = { title: "", description: "", category: "" };

export function ProductManager() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) { setError("Please select a product photo."); return; }
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Upload image to storage
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      // Insert into DB
      const { data, error: dbError } = await supabase
        .from("products")
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          image_url: publicUrl,
        })
        .select()
        .single();
      if (dbError) throw dbError;

      setProducts((prev) => [data, ...prev]);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (product: DbProduct) => {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;

    // Remove image from storage
    const fileName = product.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("product-images").remove([fileName]);
    }

    await supabase.from("products").delete().eq("id", product.id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Add Product Form */}
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold text-foreground mb-6">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card border border-border rounded-xl p-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Product Photo *
            </label>
            <label className="block cursor-pointer">
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-background/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-sm text-white font-medium">Change photo</span>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors bg-background/50">
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Laser Cut Bracket Set"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Short description of the product or project…"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && (
            <p className="text-sm text-green-400">Product added successfully!</p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full h-10 bg-gradient-to-r from-primary to-accent text-white rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add Product
              </>
            )}
          </button>
        </form>
      </div>

      {/* Products List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          All Products{" "}
          <span className="text-muted-foreground font-normal text-base">({products.length})</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-xl">
            No products yet. Add your first one using the form.
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl"
              >
                <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-background border border-border">
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(product)}
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0 rounded-md hover:bg-red-400/10"
                  aria-label={`Delete ${product.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
