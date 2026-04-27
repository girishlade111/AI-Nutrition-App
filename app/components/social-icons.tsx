"use client";

import { Github, Twitter, Linkedin, Globe } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/girishlade111", icon: Github, label: "GitHub" },
  { href: "https://twitter.com/girish_lade_", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/in/girishlade", icon: Linkedin, label: "LinkedIn" },
  { href: "https://ladestack.in", icon: Globe, label: "Website" },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-3">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors duration-200"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
