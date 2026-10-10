import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/rivi/Site";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RIVI CREATION" },
      {
        name: "description",
        content:
          "Tell RIVI CREATION about your special occasion, custom gift idea or personal request.",
      },
      { property: "og:title", content: "Contact — RIVI CREATION" },
      {
        property: "og:description",
        content:
          "Tell RIVI CREATION about your special occasion, custom gift idea or personal request.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SitePage page="contact" />,
});
