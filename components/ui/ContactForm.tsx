"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type FormState = {
  email: string;
  subject: string;
  message: string;
};

const MAX_MESSAGE = 500;

const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (key === "message") {
        setForm((prev) => ({ ...prev, message: value.slice(0, MAX_MESSAGE) }));
        return;
      }

      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, subject, message } = form;
    if (!email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: confirm endpoint with backend dev
      await axios.post("/contact", { email, subject, message });
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            className="h-11 w-full rounded-md border border-[#E5DED3] bg-[#F8F5EE] px-3 text-sm text-charcoal placeholder:text-[#9A948A] outline-none focus:border-[#C9BBA6] focus:ring-2 focus:ring-[#D4AF37]/20"
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
            placeholder="Enter Subject for message"
            className="h-11 w-full rounded-md border border-[#E5DED3] bg-[#F8F5EE] px-3 text-sm text-charcoal placeholder:text-[#9A948A] outline-none focus:border-[#C9BBA6] focus:ring-2 focus:ring-[#D4AF37]/20"
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
  );
};

export default ContactForm;
