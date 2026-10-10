import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/rivi/Site";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIVI CREATION — Beautiful Gifts Made With Love" },
      {
        name: "description",
        content:
          "Handcrafted bouquets, chocolate arrangements, gift hampers and personalized gifts for your special moments.",
      },
      { property: "og:title", content: "RIVI CREATION — Beautiful Gifts Made With Love" },
      {
        property: "og:description",
        content:
          "Handcrafted bouquets, chocolate arrangements, gift hampers and personalized gifts for your special moments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SitePage page="home" />,
});
