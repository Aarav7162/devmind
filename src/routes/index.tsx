import { createFileRoute } from "@tanstack/react-router";
import { DevMindPage } from "@/components/DevMindPage";

export const Route = createFileRoute("/")({
  component: DevMindPage,
  head: () => ({
    meta: [
      { title: "DevMind — Project consciousness for solo developers" },
      {
        name: "description",
        content:
          "DevMind watches your project silently, understands what you're building, and gives you your brain back every morning. Local AI. Free forever.",
      },
      { property: "og:title", content: "DevMind — Project consciousness for solo developers" },
      {
        property: "og:description",
        content: "Local AI CLI that remembers what you were building. Resume, standup, commit — instantly.",
      },
    ],
  }),
});
