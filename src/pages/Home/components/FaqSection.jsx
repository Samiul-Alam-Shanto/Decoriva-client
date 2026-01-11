import SectionTitle from "../../../components/shared/SectionTitle";

const FaqSection = () => {
  const faqs = [
    {
      q: "How far in advance should I book?",
      a: "For weddings and large corporate events, we recommend booking 3-6 months in advance. For smaller home setups, 2 weeks is sufficient.",
    },
    {
      q: "Can I customize the packages?",
      a: "Absolutely. Our packages are starting points. After booking, our design consultant will work with you to tailor colors, flowers, and layout to your vision.",
    },
    {
      q: "Is the booking fee refundable?",
      a: "We offer a 100% refund if cancelled 30 days prior to the event. Cancellations within 14 days incur a 20% service fee to cover initial material sourcing.",
    },
    {
      q: "Do you travel outside Dhaka?",
      a: "Yes, Decoriva operates nationwide. For events outside our hub cities (Dhaka, Ctg, Sylhet), a flat logistics fee applies based on distance.",
    },
  ];

  return (
    <section className="py-24 bg-base-200/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle
          heading="Common Questions"
          subHeading="Everything you need to know"
          center={true}
        />

        <div className="join join-vertical w-full bg-base-100 shadow-xl rounded-3xl border border-base-content/5 mt-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="collapse collapse-plus join-item border-b border-base-content/10 last:border-none py-2"
            >
              <input
                type="radio"
                name="my-accordion-4"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title text-xl font-serif font-medium hover:text-primary transition-colors">
                {faq.q}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70 leading-relaxed pb-4 pl-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FaqSection;
