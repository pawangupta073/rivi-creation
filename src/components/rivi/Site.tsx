import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Heart,
  Flower2,
  Gift,
  Sparkles,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products, money, enquirySchema, saveLocalRecord, type Product } from "@/lib/gifts";
import { OrderModal } from "./OrderModal";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="RIVI CREATION home"
    >
      <span className="brand-seal">
        <Flower2 strokeWidth={1} />
        <span>RIVI</span>
      </span>
      <span className="brand-name">
        RIVI CREATION<span>GIFTS FROM THE HEART</span>
      </span>
    </Link>
  );
}
export function Navbar({ onOrder }: { onOrder: () => void }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const links = [
    { to: "/" as const, name: "Home" },
    { to: "/products" as const, name: "Products" },
    { to: "/about" as const, name: "About" },
    { to: "/contact" as const, name: "Contact" },
  ];
  return (
    <header className="site-header">
      <div className="container navbar">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "nav-active" }}
              activeOptions={{ exact: true }}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="rose" size="pill" onClick={onOrder}>
            Order Now <ShoppingIcon />
          </Button>
        </nav>
        <Button
          className="menu-toggle"
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            {link.name}
          </Link>
        ))}
        <Button
          variant="rose"
          onClick={() => {
            setOpen(false);
            onOrder();
          }}
        >
          Order Now <ArrowRight />
        </Button>
      </nav>
    </header>
  );
}
function ShoppingIcon() {
  return <Gift size={16} strokeWidth={1.5} />;
}
export function Hero({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" /> HANDCRAFTED WITH LOVE
          </span>
          <h1>
            Beautiful Gifts
            <br />
            <em>Made With Love.</em>
          </h1>
          <p>
            Handcrafted bouquets, chocolate arrangements, hampers and customized gifts made
            specially for your special moments.
          </p>
          <div className="hero-actions">
            <Button variant="rose" size="premium" asChild>
              <Link to="/products">
                Explore Collection <ArrowRight />
              </Link>
            </Button>
            <Button variant="ivory" size="premium" onClick={onOrder}>
              Order Now <Heart />
            </Button>
          </div>
          <div className="hero-note">
            <span className="tiny-flower">
              <Flower2 strokeWidth={1.2} />
            </span>
            <span>
              A little thought. A lot of love.
              <br />
              <small>Beautifully made, thoughtfully given.</small>
            </span>
          </div>
        </div>
        <div className="hero-photo">
          <img
            src={products[0].image}
            alt="Handcrafted blush and ivory rose bouquet wrapped with a burgundy ribbon"
            width={1024}
            height={1280}
            fetchPriority="high"
          />
          <div className="love-badge">
            <Heart size={18} strokeWidth={1.5} />
            <span>
              Made with love <span className="text-primary">♥</span>
            </span>
          </div>
          <div className="image-caption">
            <span>THE ART OF THOUGHTFUL GIFTING</span>
            <span>01 / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (p: Product) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-photo">
        <img src={product.image} alt={product.name} width={1024} height={1280} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <span className="product-price">
            <small>From</small>
            {money(product.price)}
          </span>
          <Button variant="product" onClick={() => onOrder(product)}>
            Order Now <ArrowRight />
          </Button>
        </div>
      </div>
    </article>
  );
}
export function ProductGrid({
  onOrder,
  standalone = false,
}: {
  onOrder: (p: Product) => void;
  standalone?: boolean;
}) {
  return (
    <section className={`collection section-reveal ${standalone ? "standalone" : ""}`}>
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">LITTLE GIFTS, BIG FEELINGS</span>
          {standalone ? (
            <h1>
              Our Special <em>Collection</em>
            </h1>
          ) : (
            <h2>
              Our Special <em>Collection</em>
            </h2>
          )}
          <p>
            Thoughtfully crafted gifts for birthdays, anniversaries, celebrations
            <br className="desktop-break" /> and every special moment.
          </p>
          <span className="heading-flower">
            <span />
            <Flower2 size={19} strokeWidth={1} />
            <span />
          </span>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>
        <p className="collection-note">
          <Heart size={14} /> Each gift is made to order, with your story in mind.
        </p>
      </div>
    </section>
  );
}
export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="feature-card">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
export function About({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`about-section section-reveal ${standalone ? "standalone" : ""}`}>
      <div className="container about-grid">
        <div className="about-quote">
          <span className="quote-mark">“</span>
          <blockquote>
            Every gift tells a story.
            <br />
            We help you make yours <em>unforgettable.</em>
          </blockquote>
          <span className="quote-signature">
            With love, Rivi <Heart size={15} strokeWidth={1} />
          </span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">THE HEART BEHIND EVERY GIFT</span>
          {standalone ? (
            <h1>
              Made For Your
              <br />
              <em>Special Moments</em>
            </h1>
          ) : (
            <h2>
              Made For Your
              <br />
              <em>Special Moments</em>
            </h2>
          )}
          <p>
            At RIVI CREATION, we believe the most beautiful gifts are the ones that feel personal.
            From the first ribbon to the final detail, we handcraft every creation with care,
            creativity and a little piece of our heart.
          </p>
          <p>
            Whether it’s a grand celebration or a simple “thinking of you,” we’ll help you make it
            truly yours.
          </p>
          <div className="features">
            <FeatureCard title="Handcrafted" icon={<Flower2 />}>
              Every product is carefully created by hand.
            </FeatureCard>
            <FeatureCard title="Customized" icon={<Gift />}>
              Personalize your gift according to your occasion.
            </FeatureCard>
            <FeatureCard title="Made With Love" icon={<Heart />}>
              Thoughtful designs created for memorable moments.
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = enquirySchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    try {
      saveLocalRecord("rivi-enquiries", result.data);
      setSaved(true);
      setErrors({});
      form.reset();
    } catch {
      setErrors({
        form: "Your enquiry could not be saved. Please allow browser storage and try again.",
      });
    }
  }
  return (
    <section className={`contact-section section-reveal ${standalone ? "standalone" : ""}`}>
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">LET’S MAKE IT PERSONAL</span>
          {standalone ? (
            <h1>
              Let’s Create
              <br />
              <em>Something Special</em>
            </h1>
          ) : (
            <h2>
              Let’s Create
              <br />
              <em>Something Special</em>
            </h2>
          )}
          <p>Have a special request or want to customize your gift? Get in touch with us.</p>
          <div className="contact-options">
            {[
              { name: "WhatsApp", icon: <MessageCircle />, text: "Let’s talk gifts" },
              { name: "Instagram", icon: <Instagram />, text: "A little inspiration" },
              { name: "Phone", icon: <Phone />, text: "We’d love to hear from you" },
              { name: "Email", icon: <Mail />, text: "Send a little note" },
            ].map((item) => (
              <Button
                variant="contact"
                key={item.name}
                onClick={() => {
  if (item.name === "WhatsApp") {
    window.open(
      `https://wa.me/919007343340?text=${encodeURIComponent(
        "Hello RIVI CREATION! I want to enquire about your gifts."
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  } else {
    setNotice(`${item.name} details are coming soon.`);
  }
}}
              >
                {item.icon}
                <span>
                  {item.name}
                  <small>{item.text}</small>
                </span>
                <ArrowRight />
              </Button>
            ))}
          </div>
          {notice && (
            <p className="contact-notice" role="status">
              {notice}
            </p>
          )}
          <span className="contact-signature">
            Something beautiful starts with a little conversation.
          </span>
        </div>
        <div className="contact-form-wrap">
          <h3>A note from you</h3>
          <p>Tell us what you have in mind.</p>
          {saved && (
            <div className="enquiry-success" role="status">
              <Check size={18} />
              <span>Enquiry saved on this device. It has not been sent to RIVI CREATION.</span>
            </div>
          )}
          <form onSubmit={submit} noValidate>
            <div className="form-pair">
              {(["name", "phone"] as const).map((field) => (
                <label key={field}>
                  {field === "name" ? "Your name" : "Phone number"}
                  <Input
                    name={field}
                    type={field === "phone" ? "tel" : "text"}
                    autoComplete={field === "name" ? "name" : "tel"}
                    maxLength={field === "name" ? 100 : 20}
                    placeholder={field === "name" ? "Your full name" : "Your phone number"}
                    aria-invalid={Boolean(errors[field])}
                  />
                  {errors[field] && <span className="field-error">{errors[field]}</span>}
                </label>
              ))}
            </div>
            <label>
              Email address
              <Input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors["email"])}
              />
              {errors["email"] && <span className="field-error">{errors["email"]}</span>}
            </label>
            <label>
              Your message
              <Textarea
                name="message"
                maxLength={1000}
                rows={4}
                placeholder="An occasion, an idea, a little wish…"
                aria-invalid={Boolean(errors["message"])}
              />
              {errors["message"] && <span className="field-error">{errors["message"]}</span>}
            </label>
            {errors["form"] && (
              <p className="field-error" role="alert">
                {errors["form"]}
              </p>
            )}
            <Button variant="rose" size="premium" className="w-full" type="submit">
              Send Enquiry <ArrowRight />
            </Button>
            <p className="local-note">
              Enquiries are saved locally until contact details are added.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© 2026 RIVI CREATION. All rights reserved.</span>
        <span className="footer-love">
          Thoughtfully made. Beautifully given. <Heart size={13} />
        </span>
        <div className="footer-socials">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contact" aria-label="Instagram contact">
              <Instagram size={17} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contact" aria-label="WhatsApp contact">
              <MessageCircle size={17} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contact" aria-label="Email contact">
              <Mail size={17} />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
export function SitePage({ page }: { page: "home" | "products" | "about" | "contact" }) {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);
  return (
    <>
      <Navbar onOrder={() => setProduct(products[0])} />
      <main>
        {page === "home" ? (
          <>
            <Hero onOrder={() => setProduct(products[0])} />
            <ProductGrid onOrder={setProduct} />
            <About />
            <Contact />
          </>
        ) : page === "products" ? (
          <ProductGrid onOrder={setProduct} standalone />
        ) : page === "about" ? (
          <About standalone />
        ) : (
          <Contact standalone />
        )}
      </main>
      <Footer />
      <OrderModal
        key={product?.id ?? "closed"}
        product={product}
        onClose={() => setProduct(null)}
      />
    </>
  );
}
