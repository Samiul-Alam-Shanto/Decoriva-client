import { FaCheck } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";

const Subscription = () => {
  const plans = [
    {
      name: "Silver",
      price: "29",
      features: [
        "5% Discount on all Bookings",
        "Priority Support",
        "Quarterly Trends Newsletter",
      ],
    },
    {
      name: "Gold",
      price: "59",
      features: [
        "10% Discount on all Bookings",
        "Dedicated Style Consultant",
        "Free Consultation Visits",
        "Early Access to New Collections",
      ],
      recommended: true,
    },
    {
      name: "Platinum",
      price: "99",
      features: [
        "20% Discount on all Bookings",
        "24/7 Concierge",
        "Unlimited Free Reschedules",
        "VIP Event Access",
        "Custom Design Mockups",
      ],
    },
  ];

  return (
    <div className="py-24 bg-base-100 ">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Elite Membership"
          subHeading="Join the Inner Circle"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`card bg-base-100 shadow-xl border ${
                plan.recommended
                  ? "border-secondary shadow-secondary/20 scale-105"
                  : "border-base-content/10"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 left-0 bg-secondary text-primary text-xs font-bold text-center rounded-t-xl py-1 uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="card-body items-center text-center p-10">
                <h3 className="text-2xl font-serif font-bold mb-4">
                  {plan.name}
                </h3>
                <div className="text-5xl font-bold mb-2 text-primary">
                  <span className="text-2xl align-top">$</span>
                  {plan.price}
                  <span className="text-lg text-base-content/50 font-normal">
                    /mo
                  </span>
                </div>
                <div className="divider"></div>
                <ul className="space-y-4 mb-8 text-left w-full">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm opacity-80"
                    >
                      <FaCheck className="text-success mt-1 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn w-full rounded-full ${
                    plan.recommended
                      ? "btn-primary text-white shadow-lg"
                      : "btn-outline hover:btn-primary"
                  }`}
                >
                  Join {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Subscription;
