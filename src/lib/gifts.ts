import { z } from "zod";
import rose from "@/assets/rose-bouquet.jpg";
import chocolate from "@/assets/chocolate-bouquet.jpg";
import hamper from "@/assets/gift-hamper.jpg";
import custom from "@/assets/custom-gift.jpg";

export const products = [
  {
    id: "rose",
    name: "Rose Bouquet",
    description: "Elegant handcrafted rose bouquet for someone special.",
    price: 1299,
    image: rose,
    tag: "A timeless gesture",
  },
  {
    id: "chocolate",
    name: "Chocolate Bouquet",
    description: "A beautiful combination of chocolates and flowers.",
    price: 1599,
    image: chocolate,
    tag: "Something sweet",
  },
  {
    id: "hamper",
    name: "Premium Gift Hamper",
    description: "A thoughtfully curated hamper for unforgettable moments.",
    price: 2499,
    image: hamper,
    tag: "Little luxuries",
  },
  {
    id: "custom",
    name: "Customized Gift",
    description: "Personalized gifts designed specially for your loved ones.",
    price: 999,
    image: custom,
    tag: "Uniquely yours",
  },
] as const;
export type Product = (typeof products)[number];
export const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const name = z.string().trim().min(2, "Please enter your name.").max(100);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number.")
  .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number.");
export const orderSchema = z.object({
  name,
  phone,
  address: z.string().trim().min(10, "Please enter your complete delivery address.").max(500),
  instructions: z.string().trim().max(1000),
  quantity: z.number().int().min(1).max(99),
  productId: z.enum(["rose", "chocolate", "hamper", "custom"]),
});
export const enquirySchema = z.object({
  name,
  phone,
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(1000),
});
export function saveLocalRecord(
  key: "rivi-orders" | "rivi-enquiries",
  record: Record<string, unknown>,
) {
  const stored = localStorage.getItem(key);
  const existing: unknown = stored ? JSON.parse(stored) : [];
  if (!Array.isArray(existing)) throw new Error("Saved data could not be read.");
  const id = crypto.randomUUID();
  localStorage.setItem(
    key,
    JSON.stringify([...existing, { ...record, id, createdAt: new Date().toISOString() }]),
  );
  return id;
}
