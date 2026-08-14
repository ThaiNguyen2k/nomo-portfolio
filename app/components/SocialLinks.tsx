import { FaEnvelope, FaFacebookF, FaGithub, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ThaiNguyen2k", icon: FaGithub },
  { label: "Email", href: "mailto:nguyendragon2000@gmail.com", icon: FaEnvelope },
  { label: "Facebook", href: "https://www.facebook.com/nguyenthainguyen2k", icon: FaFacebookF },
  { label: "TikTok", href: "https://www.tiktok.com/@zen_tn28", icon: FaTiktok },
  { label: "YouTube", href: "https://www.youtube.com/@Nomo284", icon: FaYoutube },
  { label: "Zalo · 0939 205 421", href: "https://zalo.me/0939205421", icon: SiZalo },
  { label: "Telegram · @nomo2k", href: "https://t.me/nomo2k", icon: FaTelegram },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <nav className={`social-icon-links ${compact ? "is-compact" : ""}`} aria-label="Nomo social links">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} title={label} key={label}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
