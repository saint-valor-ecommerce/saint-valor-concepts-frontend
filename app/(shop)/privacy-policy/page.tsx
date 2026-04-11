const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium text-charcoal tracking-tight mb-2">
          Privacy Policy
        </h1>
        <div className="w-10 h-0.5 bg-gold mb-10" />

        <div className="flex flex-col gap-10 text-sm leading-relaxed text-charcoal/80">
          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to Saint Valor. We respect your privacy and are committed
              to protecting the personal data of our clientele. This policy
              explains how we handle your information when you purchase our
              jewellery or interact with our brand online.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              2. Data Collection &amp; Purpose
            </h2>
            <p className="mb-3">
              We collect information necessary to provide a premium service,
              including:
            </p>
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-gold/30">
              <p>
                <span className="font-medium text-charcoal">
                  Identity &amp; Contact:
                </span>{" "}
                Your name, email, and phone number for order updates.
              </p>
              <p>
                <span className="font-medium text-charcoal">
                  Shipping &amp; Billing:
                </span>{" "}
                Physical addresses for the secure delivery of your pieces.
              </p>
              <p>
                <span className="font-medium text-charcoal">
                  Transaction Data:
                </span>{" "}
                Details about the products you&apos;ve purchased and the payment
                status.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              3. Payment Security
            </h2>
            <p>
              Your security is our priority. All financial transactions are
              processed through encrypted, third-party payment gateways. Saint
              Valor does not store your full credit card details or bank login
              credentials on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              4. Third-Party Sharing
            </h2>
            <p className="mb-3">
              We only share your information with essential partners to fulfill
              your experience:
            </p>
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-gold/30">
              <p>
                <span className="font-medium text-charcoal">Logistics:</span>{" "}
                Courier services for the delivery of your jewellery.
              </p>
              <p>
                <span className="font-medium text-charcoal">Compliance:</span>{" "}
                Where necessary to comply with the regulations of the Corporate
                Affairs Commission (CAC) or other legal requirements in Nigeria
                and abroad.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              5. Customer Rights
            </h2>
            <p className="mb-3">
              As a Saint Valor client, you have the right to:
            </p>
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-gold/30">
              <p>Request a copy of the data we hold about you.</p>
              <p>Request the correction of any inaccurate information.</p>
              <p>
                Opt out of marketing communications (such as new collection
                announcements) at any time.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              6. Retention of Data
            </h2>
            <p>
              We keep your order history and contact information only as long as
              necessary to provide customer support, manage warranties for your
              jewellery, or meet tax and legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              7. Contact Us
            </h2>
            <p>
              For any questions regarding this policy or your personal data,
              please contact our privacy lead at:
            </p>
            <div className="mt-3 flex flex-col gap-1">
              <p>
                <span className="font-medium text-charcoal">Email:</span>{" "}
                <span className="text-gold">saintvalorconcepts@gmail.com</span>
              </p>
              <p>
                <span className="font-medium text-charcoal">Phone:</span>{" "}
                <span className="text-gold">09034898972</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
