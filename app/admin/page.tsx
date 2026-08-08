"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { QuoteInbox } from "@/components/admin/quote-inbox";
import { ProductManager } from "@/components/admin/product-manager";
import { PartnerManager } from "@/components/admin/partner-manager";
<<<<<<< HEAD

type Tab = "quotes" | "products" | "partners";

const tabs: Array<{ key: Tab; label: string }> = [
  { key: "quotes", label: "Quote Inbox" },
  { key: "products", label: "Product Manager" },
  { key: "partners", label: "Partner Manager" },
=======
import { ReceiptManager } from "@/components/admin/receipt-manager";
import { CompanySettingsManager } from "@/components/admin/company-settings-manager";

type Tab = "quotes" | "receipts" | "products" | "partners" | "settings";

const tabs: Array<{ key: Tab; label: string }> = [
  { key: "quotes", label: "Quote Inbox" },
  { key: "receipts", label: "Receipts" },
  { key: "products", label: "Product Manager" },
  { key: "partners", label: "Partner Manager" },
  { key: "settings", label: "Settings" },
>>>>>>> feature/our_story
];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("quotes");

  const handleLogout = async () => {
    await supabase.auth.signOut();
<<<<<<< HEAD
    router.push("/admin/login");
=======
    router.replace("/");
>>>>>>> feature/our_story
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
<<<<<<< HEAD
      <header className="border-b border-border bg-card sticky top-0 z-10">
=======
      <header className="print-hide border-b border-border bg-card sticky top-0 z-10">
>>>>>>> feature/our_story
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">Metal Tronix</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
<<<<<<< HEAD
      <div className="border-b border-border bg-card/50">
=======
      <div className="print-hide border-b border-border bg-card/50">
>>>>>>> feature/our_story
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "quotes" && <QuoteInbox />}
<<<<<<< HEAD
        {activeTab === "products" && <ProductManager />}
        {activeTab === "partners" && <PartnerManager />}
=======
        {activeTab === "receipts" && <ReceiptManager />}
        {activeTab === "products" && <ProductManager />}
        {activeTab === "partners" && <PartnerManager />}
        {activeTab === "settings" && <CompanySettingsManager />}
>>>>>>> feature/our_story
      </main>
    </div>
  );
}
