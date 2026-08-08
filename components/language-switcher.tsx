"use client";

import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "sq", label: "Shqip", flag: "🇦🇱" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">{currentLang?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code ? "bg-secondary" : ""
            }`}
          >
            <span>{lang.label}</span>
            <span>{lang.flag}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
