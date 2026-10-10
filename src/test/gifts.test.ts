import { describe, expect, it, beforeEach } from "vitest";
import { orderSchema, enquirySchema, saveLocalRecord } from "@/lib/gifts";
const order = {
  productId: "rose",
  quantity: 1,
  name: "Asha Sharma",
  phone: "9876543210",
  address: "12 Garden Road, Kolkata 700001",
  instructions: "Happy birthday",
};
describe("Local gift orders", () => {
  beforeEach(() => localStorage.clear());
  it("validates and saves customer order information in localStorage", () => {
    const result = orderSchema.parse(order);
    saveLocalRecord("rivi-orders", result);
    expect(JSON.parse(localStorage.getItem("rivi-orders") ?? "[]")[0]).toMatchObject(order);
  });
  it("requires a customer name", () =>
    expect(orderSchema.safeParse({ ...order, name: "" }).success).toBe(false));
  it("requires a valid phone number", () =>
    expect(orderSchema.safeParse({ ...order, phone: "invalid" }).success).toBe(false));
  it("requires a delivery address", () =>
    expect(orderSchema.safeParse({ ...order, address: "" }).success).toBe(false));
  it("rejects a zero quantity", () =>
    expect(orderSchema.safeParse({ ...order, quantity: 0 }).success).toBe(false));
  it("preserves multiple saved orders", () => {
    saveLocalRecord("rivi-orders", order);
    saveLocalRecord("rivi-orders", { ...order, productId: "hamper" });
    expect(JSON.parse(localStorage.getItem("rivi-orders") ?? "[]")).toHaveLength(2);
  });
  it("validates enquiry email", () =>
    expect(
      enquirySchema.safeParse({
        name: order.name,
        phone: order.phone,
        email: "invalid",
        message: "A custom birthday gift please",
      }).success,
    ).toBe(false));
});
