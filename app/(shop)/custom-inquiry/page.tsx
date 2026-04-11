import Link from "next/link";
import {
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Music2,
  Ghost,
} from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export default function CustomInquiry() {
  return (
    <section className="w-full bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left panel */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold tracking-tight text-charcoal">
              B2B/custom inquiry
            </h1>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal">
              We’re here to assist with inquiries, custom designs, or any
              questions about our collections.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-medium text-charcoal">
                  Call us for instant support
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-charcoal">
                  <Phone className="h-4 w-4" />
                  <span>09034898972</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-charcoal">
                  Write us an Email
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-charcoal">
                  <Mail className="h-4 w-4" />
                  <span>saintvalorconcepts@gmail.com</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-charcoal">
                  Our social media
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-charcoal">
                  <Link
                    href="https://www.instagram.com/saint.valor_?igsh=eWQwcXVjb3Bpb3Fy&utm_source=qr"
                    className="about-social-media"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </Link>
                  <Link
                    href=" https://x.com/saintvalor_?s=21"
                    className="about-social-media"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" /> Twitter
                  </Link>
                  <Link
                    href="#"
                    className="about-social-media"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@saint.valor_?_r=1&_t=ZS-93UzpRUktaZ"
                    className="about-social-media"
                    aria-label="TikTok"
                  >
                    <Music2 className="h-4 w-4" /> TikTok
                  </Link>
                  <Link
                    href="#"
                    className="about-social-media"
                    aria-label="Snapchat"
                  >
                    <Ghost className="h-4 w-4" /> Snapchat
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel (Form) */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
