const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium text-charcoal tracking-tight mb-2">
          Terms &amp; Conditions
        </h1>
        <div className="w-10 h-0.5 bg-gold mb-10" />

        <div className="flex flex-col gap-10 text-sm leading-relaxed text-charcoal/80">
          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Overview
            </h2>
            <p>
              Welcome to Saint Valor. These terms and conditions outline the
              rules and regulations for the use of our website and the purchase
              of our luxury pieces. By accessing this website and placing an
              order, we assume you accept these terms and conditions in full.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Returns &amp; Refunds
            </h2>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-gold/30">
              <p>
                <span className="font-medium text-charcoal">Eligibility:</span>{" "}
                We accept returns only for items that arrive damaged or are not
              </p>
              <p>
                <span className="font-medium text-charcoal">Timeline:</span>{" "}
                Returns must be initiated within 2 days of delivery.
              </p>
              <p>
                <span className="font-medium text-charcoal">Process:</span> To
                initiate a return, please contact our customer service team with
                clear photographic proof of the damage or discrepancy.
              </p>
              <p>
                <span className="font-medium text-charcoal">Condition:</span>{" "}
                Items must be returned in their original, unworn condition, with
                all Saint Valor tags and luxury packaging intact.
              </p>
              <p>
                <span className="font-medium text-charcoal">
                  Refund Processing:
                </span>{" "}
                Once approved, refunds will be processed within 5–7 business
                days of us receiving the returned item.
              </p>
              <p>
                <span className="font-medium text-charcoal">
                  Payment Method:
                </span>{" "}
                Refunds will be issued via the original payment method used
                during checkout.
              </p>
              <p>
                <span className="font-medium text-charcoal">
                  Shipping Costs:
                </span>{" "}
                Shipping costs for returns are the responsibility of the
                customer, unless the item was confirmed to be damaged or
                incorrectly described by us.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Order Cancellation
            </h2>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-gold/30">
              <p>
                <span className="font-medium text-charcoal">Window:</span>{" "}
                Orders can only be cancelled before shipment. Once an item has
                been dispatched, the cancellation policy no longer applies.
              </p>
              <p>
                <span className="font-medium text-charcoal">Contact:</span> To
                cancel an order, please contact our team immediately at{" "}
                <span className="text-gold">saintvalorconcepts@gmail.com</span>
              </p>
              <p>
                <span className="font-medium text-charcoal">Fees:</span>{" "}
                Cancellations may be subject to a restocking fee to cover
                administrative and processing costs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Sale Items
            </h2>
            <p>
              Only regular-priced items may be eligible for a refund. Sale items
              are considered final sale and cannot be refunded or exchanged.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Exchanges
            </h2>
            <p>
              We only replace items if they are defective or damaged upon
              arrival. If you need to exchange a piece for the same item, please
              email us at{" "}
              <span className="text-gold">saintvalorconcepts@gmail.com</span> to
              arrange the logistics for returning the defective piece to our
              physical office.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Order Return Notification
            </h2>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your item. We will also
              notify you of the approval or rejection of your refund based on
              the condition of the piece. If approved, the credit will
              automatically be applied to your original method of payment within
              a specified number of days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Disclaimer
            </h2>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-gold/30">
              <p>
                <span className="font-medium text-charcoal">Accuracy:</span> We
                strive to provide the most accurate product descriptions and
                high-resolution images of our jewellery.
              </p>
              <p>
                <span className="font-medium text-charcoal">Variations:</span>{" "}
                However, due to the nature of luxury materials and digital
                displays, we are not responsible for minor discrepancies in
                colour or perceived size.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be effective immediately upon being posted
              on the Saint Valor website.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-charcoal mb-3">
              Need Help?
            </h2>
            <p>
              For any questions related to refunds, returns, or your specific
              order, please reach out to us:
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

export default TermsAndConditions;
