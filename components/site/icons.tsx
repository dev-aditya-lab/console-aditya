import { BookOpen, Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import type { SocialLink } from "@/data/site";

const map = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  blog: BookOpen,
} satisfies Record<SocialLink["iconKey"], React.ElementType>;

export function SocialIcon({ iconKey, className }: { iconKey: SocialLink["iconKey"]; className?: string }) {
  const Icon = map[iconKey];
  return <Icon className={className} strokeWidth={1.6} />;
}
