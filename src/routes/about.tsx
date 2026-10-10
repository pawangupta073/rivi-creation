import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/rivi/Site";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — RIVI CREATION" },
      {
        name: "description",
        content:
          "Meet the heart behind RIVI CREATION: thoughtful handcrafted gifts, personal touches and moments made unforgettable.",
      },
      { property: "og:title", content: "Our Story — RIVI CREATION" },
      {
        property: "og:description",
        content:
          "Meet the heart behind RIVI CREATION: thoughtful handcrafted gifts, personal touches and moments made unforgettable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SitePage page="about" />,
});
