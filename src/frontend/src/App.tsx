import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ServiceType, useBookAppointment } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Dr. Urvi", href: "#about" },
  { label: "Appointments", href: "#appointment" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: "🦷",
    title: "General Dentistry",
    desc: "Comprehensive check-ups, fillings, and preventive care for lifelong oral health.",
  },
  {
    icon: "🔩",
    title: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacements that restore your smile and confidence.",
  },
  {
    icon: "🦺",
    title: "Root Canal Treatment",
    desc: "Pain-free root canal procedures using advanced technology for quick recovery.",
  },
  {
    icon: "✨",
    title: "Cosmetic Dentistry",
    desc: "Veneers, bonding, and smile makeovers tailored to your unique aesthetic goals.",
  },
  {
    icon: "😁",
    title: "Orthodontics (Braces)",
    desc: "Metal, ceramic, and clear aligners to straighten teeth at any age.",
  },
  {
    icon: "⚡",
    title: "Teeth Whitening",
    desc: "Professional-grade whitening treatments for a brilliantly bright smile.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    initials: "PS",
    text: "Dr. Urvi is absolutely wonderful! She made my root canal completely painless. The clinic is spotless and the staff is so warm. I highly recommend Vivify Dental!",
    stars: 5,
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    text: "I had my teeth whitened here and the results were amazing — 6 shades lighter! Dr. Urvi explained every step of the process. Will definitely return for my implants.",
    stars: 5,
  },
  {
    name: "Ananya Kapoor",
    initials: "AK",
    text: "Brought my 10-year-old for braces consultation. Dr. Urvi was so patient and gentle with him. We felt completely at ease. Truly the best dental experience in Gurugram!",
    stars: 5,
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.slice(0, count).map((k) => (
        <Star key={k} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-teal-dark text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Now: +91 98765 43210</span>
          </a>
          <a
            href="mailto:drurvi@vivifydental.com"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>drurvi@vivifydental.com</span>
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-teal-primary flex items-center justify-center">
              <span className="text-white text-lg">🦷</span>
            </div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-teal-dark text-base leading-none">
                Vivify Dental
              </div>
              <div className="text-xs text-muted-foreground">Clinic</div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                  className="text-sm font-medium text-foreground hover:text-teal-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-teal-primary hover:bg-teal-dark text-white rounded-full px-5"
              data-ocid="nav.book_appointment.button"
            >
              <a href="#appointment">Book Appointment</a>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            data-ocid="nav.mobile_menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <ul className="px-4 py-3 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block py-2 text-sm font-medium hover:text-teal-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      window.location.hash = "appointment";
                    }}
                    className="block w-full text-center bg-teal-primary hover:bg-teal-dark text-white rounded-lg py-2.5 mt-2 text-sm font-semibold transition-colors"
                    data-ocid="nav.mobile_book_appointment.button"
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function HeroSection() {
  return (
    <section id="home" className="bg-teal-light min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-teal-medium px-4 py-1.5 rounded-full text-sm font-medium text-teal-dark">
            <span>✓</span> Trusted by 10,000+ patients
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Advanced Dental Care for Your{" "}
            <span className="text-teal-primary">Perfect Smile</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of patients in Gurugram. Experience gentle,
            world-class dentistry with Dr. Urvi — your smile is our priority.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-teal-primary hover:bg-teal-dark text-white rounded-full px-8"
              data-ocid="hero.book_appointment.button"
            >
              <a href="#appointment">
                Book Appointment <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-teal-primary text-teal-primary hover:bg-teal-light"
              data-ocid="hero.our_services.button"
            >
              <a href="#services">Our Services</a>
            </Button>
          </div>
          <div className="flex gap-8 pt-2">
            <div>
              <div className="font-heading text-3xl font-bold text-teal-primary">
                10+
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-teal-primary">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">
                Happy Patients
              </div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-teal-primary">
                6+
              </div>
              <div className="text-sm text-muted-foreground">Services</div>
            </div>
          </div>
        </motion.div>

        {/* Right - image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/hero-dental.dim_800x600.jpg"
              alt="Vivify Dental Clinic modern interior"
              className="w-full h-full object-cover max-h-[520px]"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">
                4.9/5 Rating
              </div>
              <div className="text-xs text-muted-foreground">500+ Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-teal-primary font-semibold text-sm uppercase tracking-widest mb-2">
            What We Offer
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            Our Dental Services
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Comprehensive dental care under one roof, using the latest
            techniques and technology.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="services.list"
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-ocid={`services.item.${i + 1}`}
              className="group border border-border rounded-2xl p-6 hover:shadow-card hover:border-teal-primary transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-light flex items-center justify-center text-2xl mb-4 group-hover:bg-teal-medium transition-colors">
                {svc.icon}
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">
                {svc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {svc.desc}
              </p>
              <a
                href="#appointment"
                className="inline-block mt-4 text-sm font-medium text-teal-primary hover:text-teal-dark transition-colors"
              >
                Book Now →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-teal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:mx-0">
              <img
                src="/assets/generated/dr-urvi-portrait.dim_400x500.jpg"
                alt="Dr. Urvi – Dental Surgeon"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-teal-primary text-white rounded-2xl px-5 py-3 shadow-lg">
              <div className="font-bold text-lg">10+ Years</div>
              <div className="text-sm opacity-90">of Excellence</div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="text-teal-primary font-semibold text-sm uppercase tracking-widest">
              About the Doctor
            </div>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Meet Dr. Urvi
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Dr. Urvi is a highly experienced dental surgeon with over 10 years
              of expertise in cosmetic and restorative dentistry. She is known
              for her gentle approach and commitment to patient comfort,
              ensuring every visit is stress-free and effective.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Holding a B.D.S. and M.D.S., she has helped thousands of patients
              rediscover their confidence through beautiful, healthy smiles. Her
              clinic combines the latest dental technology with a warm,
              welcoming environment.
            </p>

            <div className="flex flex-wrap gap-3">
              {["B.D.S.", "M.D.S.", "10+ Years Exp.", "10,000+ Patients"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="bg-teal-medium text-teal-dark text-sm font-medium px-4 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-1">Signed,</p>
              <p className="signature">Dr. Urvi</p>
              <p className="text-xs text-muted-foreground mt-1">
                B.D.S., M.D.S. – Dental Surgeon
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AppointmentSection() {
  const {
    mutate: bookAppointment,
    isPending,
    isSuccess,
  } = useBookAppointment();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service) {
      toast.error("Please select a service");
      return;
    }
    const dateMs = BigInt(new Date(form.date).getTime()) * 1_000_000n;
    bookAppointment(
      {
        patientName: form.name,
        phone: form.phone,
        email: form.email,
        preferredDate: dateMs,
        service: form.service as ServiceType,
        message: form.message,
      },
      {
        onSuccess: () => {
          toast.success("Appointment booked! We'll confirm shortly.");
          setForm({
            name: "",
            phone: "",
            email: "",
            date: "",
            service: "",
            message: "",
          });
        },
        onError: () => toast.error("Booking failed. Please try again."),
      },
    );
  };

  return (
    <section id="appointment" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-teal-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Schedule a Visit
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            Book Your Appointment
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in the form below and we&apos;ll confirm your appointment
            shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-teal-light rounded-3xl p-8 sm:p-10 shadow-card"
          data-ocid="appointment.panel"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
                data-ocid="appointment.success_state"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Appointment Request Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thank you! We&apos;ll contact you within 24 hours to confirm
                  your appointment.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-5"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="appt-name">Full Name *</Label>
                  <Input
                    id="appt-name"
                    required
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-white"
                    data-ocid="appointment.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="appt-phone">Phone Number *</Label>
                  <Input
                    id="appt-phone"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="bg-white"
                    data-ocid="appointment.phone.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="appt-email">Email Address *</Label>
                  <Input
                    id="appt-email"
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-white"
                    data-ocid="appointment.email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="appt-date">Preferred Date *</Label>
                  <Input
                    id="appt-date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    className="bg-white"
                    data-ocid="appointment.date.input"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="appt-service">Service *</Label>
                  <Select
                    value={form.service}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, service: v }))
                    }
                  >
                    <SelectTrigger
                      id="appt-service"
                      className="bg-white"
                      data-ocid="appointment.service.select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ServiceType.cleaning}>
                        General Dentistry
                      </SelectItem>
                      <SelectItem value={ServiceType.implants}>
                        Dental Implants
                      </SelectItem>
                      <SelectItem value={ServiceType.extractions}>
                        Root Canal Treatment
                      </SelectItem>
                      <SelectItem value={ServiceType.consultation}>
                        Cosmetic Dentistry
                      </SelectItem>
                      <SelectItem value={ServiceType.braces}>
                        Orthodontics (Braces)
                      </SelectItem>
                      <SelectItem value={ServiceType.whitening}>
                        Teeth Whitening
                      </SelectItem>
                      <SelectItem value={ServiceType.filling}>
                        Filling
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="appt-message">Message (optional)</Label>
                  <Textarea
                    id="appt-message"
                    placeholder="Any specific concerns or questions..."
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-white resize-none"
                    data-ocid="appointment.message.textarea"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-center pt-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    size="lg"
                    className="bg-teal-primary hover:bg-teal-dark text-white rounded-full px-12"
                    data-ocid="appointment.submit.button"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Booking...
                      </span>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-teal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-teal-primary font-semibold text-sm uppercase tracking-widest mb-2">
            What Patients Say
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            Patient Testimonials
          </h2>
        </motion.div>

        <div
          className="grid md:grid-cols-3 gap-6"
          data-ocid="testimonials.list"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`testimonials.item.${i + 1}`}
              className="bg-white rounded-2xl p-7 shadow-card border border-border"
            >
              <StarRating count={t.stars} />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-teal-primary flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Verified Patient
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-teal-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Find Us
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            Contact &amp; Location
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-card h-80 lg:h-auto min-h-[320px]"
          >
            <iframe
              title="Vivify Dental Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8117977836734!2d77.02882727460774!3d28.459496891579287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f0e000e285%3A0x52fca7d0d7a3a3e0!2sSector%2014%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <MapPin className="w-5 h-5 text-teal-primary shrink-0" />
                  ),
                  label: "Address",
                  value:
                    "123, Medical Complex, Sector 14, Gurugram, Haryana – 122001",
                },
                {
                  icon: (
                    <Phone className="w-5 h-5 text-teal-primary shrink-0" />
                  ),
                  label: "Phone",
                  value: "+91 98765 43210",
                },
                {
                  icon: <Mail className="w-5 h-5 text-teal-primary shrink-0" />,
                  label: "Email",
                  value: "drurvi@vivifydental.com",
                },
                {
                  icon: (
                    <Clock className="w-5 h-5 text-teal-primary shrink-0" />
                  ),
                  label: "Hours",
                  value: "Mon – Sat: 10:00 AM – 7:00 PM",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-xl bg-teal-light"
                >
                  <div className="w-9 h-9 rounded-full bg-teal-medium flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-sm text-foreground mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-teal-primary hover:bg-teal-dark text-white rounded-full px-8"
                data-ocid="contact.book_appointment.button"
              >
                <a href="#appointment">Book Appointment</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-teal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">
                🦷
              </div>
              <div>
                <div className="font-heading font-bold text-white text-base leading-none">
                  Vivify Dental
                </div>
                <div className="text-xs text-white/60">Clinic</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Your Smile, Our Priority. Advanced dental care delivered with
              compassion and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Services", "Appointments", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "General Dentistry",
                "Dental Implants",
                "Root Canal",
                "Cosmetic Dentistry",
                "Orthodontics",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              About
            </h4>
            <ul className="space-y-2">
              {["About Dr. Urvi", "Testimonials", "Book Appointment"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${
                        item === "About Dr. Urvi"
                          ? "about"
                          : item === "Testimonials"
                            ? "testimonials"
                            : "appointment"
                      }`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/60">
            © {year} Vivify Dental Clinic. All rights reserved.
          </p>
          <p className="text-sm text-white/60">
            Built with ❤️ using{" "}
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <AppointmentSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
