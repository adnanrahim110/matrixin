import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { SERVICES } from "./services";

const toNavServiceName = (name = "") =>
  String(name).replace(/\s+in\s+USA$/i, "").trim();

const SERVICES_DROPDOWN = SERVICES.map((service) => ({
  name: toNavServiceName(service.name),
  slug: service.slug,
}));

export const navlinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: false, dropdown: SERVICES_DROPDOWN },
  // { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact-us" },
];

export const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/",
    Icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    Icon: Linkedin,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/",
    Icon: Twitter,
  },
];

export const contactDetails = [
  {
    name: "Email",
    value: "info@marketinix.com",
    href: "mailto:info@marketinix.com",
    Icon: Mail,
    tone: "primary",
    description: "Send a brief - or just say hello.",
  },
  // {
  //   name: "Phone",
  //   value: "+1 234 567 890",
  //   href: "tel:+1234567890",
  //   Icon: Phone,
  //   tone: "green",
  //   description: "Prefer a call? We're happy to chat.",
  // },
];
