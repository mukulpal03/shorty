import {
  BarChart3,
  Clock,
  Globe,
  Link2,
  QrCode,
  Shield,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type NavLink = {
  label: string
  href: string
}

export type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

export type Step = {
  step: number
  title: string
  description: string
}

export type Stat = {
  value: string
  label: string
}

export type Plan = {
  name: string
  price: string
  description: string
  features: readonly string[]
  highlighted: boolean
}

export const SITE = {
  name: "Shorty",
  tagline: "Short links. Real insights.",
  description:
    "Turn long URLs into branded short links, track every click, and understand your audience — all in one place.",
  domain: "localhost:3000",
} as const

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
]

export const STATS: Stat[] = [
  { value: "10M+", label: "Links created" },
  { value: "<50ms", label: "Avg. redirect" },
  { value: "99.9%", label: "Uptime" },
  { value: "120+", label: "Countries" },
]

export const FEATURES: Feature[] = [
  {
    icon: Link2,
    title: "Branded short links",
    description:
      "Create memorable links with your custom domain. Make every share look professional.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    description:
      "See clicks, referrers, devices, and locations in real time. Know what's working.",
  },
  {
    icon: QrCode,
    title: "QR codes",
    description:
      "Generate dynamic QR codes for any link. Perfect for print, events, and packaging.",
  },
  {
    icon: Clock,
    title: "Link expiration",
    description:
      "Set expiry dates on sensitive links. Keep campaigns tidy and your links secure.",
  },
  {
    icon: Shield,
    title: "Spam protection",
    description:
      "Automatic malware and phishing detection keeps your audience safe from bad links.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    description:
      "Collaborate with your team. Share links, folders, and analytics in one workspace.",
  },
]

export const STEPS: Step[] = [
  {
    step: 1,
    title: "Paste your URL",
    description: "Drop any long link into Shorty. We handle the rest in milliseconds.",
  },
  {
    step: 2,
    title: "Customize your link",
    description: "Pick a slug, set UTM params, or use your own domain for brand consistency.",
  },
  {
    step: 3,
    title: "Share and track",
    description: "Share anywhere and watch clicks roll in with live analytics on your dashboard.",
  },
]

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const

export const HERO_BADGES = [
  { icon: Zap, label: "Instant redirects" },
  { icon: Globe, label: "Global edge network" },
  { icon: Sparkles, label: "Free to start" },
] as const

export const PLANS: readonly Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["100 links / month", "Basic analytics", "shorty.co domain"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    description: "For creators and small teams",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom domains",
      "QR codes",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    description: "For growing organizations",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "SSO & SAML",
      "Priority support",
    ],
    highlighted: false,
  },
]
