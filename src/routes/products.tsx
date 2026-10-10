import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/rivi/Site";
export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Special Collection — RIVI CREATION" },
      {
        name: "description",
        content:
          "Explore handcrafted rose bouquets, chocolate bouquets, premium gift hampers and customized gifts.",
      },
      { property: "og:title", content: "Our Special Collection — RIVI CREATION" },
      {
        property: "og:description",
        content:
          "Explore handcrafted rose bouquets, chocolate bouquets, premium gift hampers and customized gifts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SitePage page="products" />,
});
