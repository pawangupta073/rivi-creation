import { useState, type FormEvent } from "react";
import { Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { money, orderSchema, saveLocalRecord, type Product } from "@/lib/gifts";

export function OrderModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = orderSchema.safeParse({ ...data, quantity, productId: product.id });
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
        ),
      );
      return;
    }
    try {
      saveLocalRecord("rivi-orders", {
        ...result.data,
        productName: product.name,
        unitPrice: product.price,
        total: product.price * quantity,
      });
      setSuccess(true);
      setErrors({});
    } catch {
      setErrors({
        form: "Your order could not be saved. Please allow browser storage and try again.",
      });
    }
  }
  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="order-dialog">
        {success ? (
          <div className="order-success">
            <span className="success-icon">
              <Check />
            </span>
            <DialogTitle>Your gift is one step closer.</DialogTitle>
            <DialogDescription>
              Your order has been saved on this device. It has not been sent to RIVI CREATION.
            </DialogDescription>
            <p>Thank you for choosing something made with love.</p>
            <Button variant="rose" onClick={onClose}>
              Continue exploring <Heart />
            </Button>
          </div>
        ) : (
          <>
            <div className="order-product">
              {product && <img src={product.image} alt={product.name} width={1024} height={1280} />}
              <div>
                <span className="eyebrow">A LITTLE SOMETHING SPECIAL</span>
                <DialogTitle>{product?.name}</DialogTitle>
                <DialogDescription>Handcrafted, just for your special moment.</DialogDescription>
                <span className="order-price">{money(product?.price ?? 0)}</span>
              </div>
            </div>
            <form onSubmit={submit} noValidate className="order-form">
              <div className="quantity-row">
                <label>Quantity</label>
                <div className="quantity-control">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                    onClick={() => setQuantity((q) => q - 1)}
                  >
                    <Minus />
                  </Button>
                  <output aria-label="Quantity">{quantity}</output>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Increase quantity"
                    disabled={quantity === 99}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
                <strong>{money((product?.price ?? 0) * quantity)}</strong>
              </div>
              <div className="form-pair">
                {(["name", "phone"] as const).map((field) => (
                  <label key={field}>
                    {field === "name" ? "Customer name" : "Phone number"}
                    <Input
                      name={field}
                      autoComplete={field === "name" ? "name" : "tel"}
                      type={field === "phone" ? "tel" : "text"}
                      maxLength={field === "name" ? 100 : 20}
                      placeholder={field === "name" ? "Your full name" : "Your phone number"}
                      aria-invalid={Boolean(errors[field])}
                    />
                    {errors[field] && <span className="field-error">{errors[field]}</span>}
                  </label>
                ))}
              </div>
              <label>
                Delivery address
                <Textarea
                  name="address"
                  autoComplete="street-address"
                  maxLength={500}
                  placeholder="House, street, city and postal code"
                  aria-invalid={Boolean(errors["address"])}
                />
                {errors["address"] && <span className="field-error">{errors["address"]}</span>}
              </label>
              <label>
                Special instructions <span className="optional">(optional)</span>
                <Textarea
                  name="instructions"
                  maxLength={1000}
                  placeholder="An occasion, a personal message, a favourite colour…"
                />
                {errors["instructions"] && (
                  <span className="field-error">{errors["instructions"]}</span>
                )}
              </label>
              {errors["form"] && (
                <p className="field-error" role="alert">
                  {errors["form"]}
                </p>
              )}
              <Button variant="rose" type="submit" className="w-full">
                Place Order <ShoppingBag />
              </Button>
              <p className="local-note">Saved on this device only. No payment is taken.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
