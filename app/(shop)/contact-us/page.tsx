"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const MAX_MESSAGE = 500;

const FAQ_ITEMS = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery within Lagos takes 1–3 business days. Other states in Nigeria take 3–7 business days. International orders are estimated at 7–14 business days depending on the destination.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can only be cancelled before shipment. Once an item has been dispatched, the cancellation policy no longer applies. Contact us immediately at saintvalorconcepts@gmail.com to request a cancellation.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns only for items that arrive damaged or are not as described. Returns must be initiated within 2 days of delivery for Nigerian orders and 5 days for international orders. Items must be in original, unworn condition with all tags intact.",
  },
  {
    question: "Do you offer exchanges?",
    answer:
      "We offer exchanges within 2 days for Nigerian orders and 5 days for international orders. Items must be in new, unused condition with all original tags and protective materials intact. Engraved items, custom pieces, and special orders are not eligible.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. You can also check your order status by visiting your account and navigating to the orders section.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "All transactions are processed through Paystack, a PCI-DSS compliant payment gateway. Saint Valor does not store your credit card details or bank credentials on our servers.",
  },
];

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-charcoal transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`text-secondary shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-xs leading-relaxed text-charcoal/70">{answer}</p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (field === "message" && value.length > MAX_MESSAGE) return;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, subject, message } = form;
    if (!email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    const mailtoLink = `mailto:saintvalorconcepts@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )}`;

    window.location.href = mailtoLink;
    setIsSubmitting(false);
    toast.success("Opening your email client...");
  };

  const inputClass =
    "h-11 w-full rounded-md border border-[#E5DED3] bg-[#F8F5EE] px-3 text-sm text-charcoal placeholder:text-[#9A948A] outline-none focus:border-[#C9BBA6] focus:ring-2 focus:ring-[#D4AF37]/20";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <div className="bg-charcoal px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-medium text-ivory tracking-tight mb-3">
            Get in Touch
          </h1>
          <div className="w-10 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-sm text-ivory/60 max-w-md mx-auto leading-relaxed">
            We&apos;d love to hear from you. Whether you have a question about
            our pieces, need help with an order, or want to explore a custom
            creation — our team is here to help.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-5xl mx-auto px-4 md:px-16 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="mailto:saintvalorconcepts@gmail.com"
            className="flex flex-col items-center gap-3 bg-white border border-border p-6 rounded-sm hover:border-gold/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center group-hover:bg-gold/10 transition-colors">
              <Mail size={18} className="text-gold" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-charcoal mb-1">Email</p>
              <p className="text-[11px] text-secondary break-all">
                saintvalorconcepts@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:09034898972"
            className="flex flex-col items-center gap-3 bg-white border border-border p-6 rounded-sm hover:border-gold/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center group-hover:bg-gold/10 transition-colors">
              <Phone size={18} className="text-gold" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-charcoal mb-1">Phone</p>
              <p className="text-[11px] text-secondary">09034898972</p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-3 bg-white border border-border p-6 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center">
              <MapPin size={18} className="text-gold" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-charcoal mb-1">
                Location
              </p>
              <p className="text-[11px] text-secondary">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 bg-white border border-border p-6 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center">
              <Clock size={18} className="text-gold" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-charcoal mb-1">Hours</p>
              <p className="text-[11px] text-secondary">Mon – Sat, 9AM – 6PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form + FAQ */}
      <div className="max-w-5xl mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-medium text-charcoal mb-1">
              Send us a Message
            </h2>
            <p className="text-xs text-secondary mb-6">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>

            <div className="rounded-xl bg-transparent">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium text-charcoal">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    placeholder="Enter your email address"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-charcoal">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={onChange("subject")}
                    placeholder="Enter title of message"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-charcoal">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    placeholder="Write message here..."
                    rows={6}
                    className="w-full resize-none rounded-md border border-[#E5DED3] bg-[#F8F5EE] px-3 py-3 text-sm text-charcoal placeholder:text-[#9A948A] outline-none focus:border-[#C9BBA6] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                  <div className="mt-2 flex justify-end text-xs text-[#8B847A]">
                    <span>
                      {Math.min(form.message.length, MAX_MESSAGE)}/{MAX_MESSAGE}
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-charcoal shadow-sm transition hover:brightness-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-medium text-charcoal mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-secondary mb-6">
              Quick answers to common questions about orders, shipping, and
              returns.
            </p>

            <div className="border-t border-border">
              {FAQ_ITEMS.map((item) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
