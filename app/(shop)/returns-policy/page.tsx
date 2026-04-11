const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium text-charcoal tracking-tight mb-2">
          Returns
        </h1>
        <div className="w-10 h-0.5 bg-gold mb-10" />

        <div className="flex flex-col gap-10 text-sm leading-relaxed text-charcoal/80">
          <section>
            <p>
              At Saint Valor, we strive to ensure your complete satisfaction
              with every purchase. While all sales are final and non-refundable
              after payment, we do offer exchanges within:
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border rounded">
                <span className="text-gold text-lg font-semibold">2</span>
                <div>
                  <p className="text-xs font-medium text-charcoal">Days</p>
                  <p className="text-xs text-charcoal/60">
                    For orders delivered within Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border rounded">
                <span className="text-gold text-lg font-semibold">5</span>
                <div>
                  <p className="text-xs font-medium text-charcoal">Days</p>
                  <p className="text-xs text-charcoal/60">
                    For international orders
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Exchange Eligibility
            </h2>
            <p>
              To be eligible for an exchange, items must be in new, unused
              condition, with all original tags and protective materials intact.
              Unfortunately, we cannot accept exchanges for items that show
              signs of wear, accidental damage, or any alterations.
            </p>
          </section>

          <section>
            <div className="px-4 py-4 bg-white border border-gold/20 rounded">
              <p className="text-xs font-semibold text-charcoal mb-1">
                Please Note
              </p>
              <p className="text-xs text-charcoal/70">
                Engraved items, custom pieces, and special orders are not
                eligible for exchange.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Get in Touch
            </h2>
            <p>
              For exchange requests or any additional inquiries, don&apos;t
              hesitate to get in touch with us at{" "}
              <a
                href="mailto:saintvalorconcepts@gmail.com"
                className="text-gold hover:underline"
              >
                saintvalorconcepts@gmail.com
              </a>
            </p>
            <p className="mt-3 text-charcoal font-medium">
              We are happy to assist you!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
