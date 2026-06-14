export type MockShortUrl = {
  id: string
  shortLink: string
  originalUrl: string
  createdAt: string
}

export const MOCK_SHORT_URLS: MockShortUrl[] = [
  {
    id: "1",
    shortLink: "shorty.co/launch",
    originalUrl: "https://your-website.com/blog/launch-announcement",
    createdAt: "Jun 10, 2026, 2:30 PM",
  },
  {
    id: "2",
    shortLink: "shorty.co/docs",
    originalUrl: "https://docs.example.com/getting-started/installation",
    createdAt: "Jun 8, 2026, 9:15 AM",
  },
  {
    id: "3",
    shortLink: "shorty.co/promo",
    originalUrl: "https://shop.example.com/summer-sale?utm_source=twitter",
    createdAt: "Jun 5, 2026, 4:45 PM",
  },
]
