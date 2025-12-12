import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaWallet, FaReceipt, FaArrowDown } from "react-icons/fa";
import CountUp from "react-countup";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data.filter((item) => item.transactionId);
    },
  });

  const totalSpent = payments.reduce((acc, curr) => acc + curr.price, 0);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold">Billing & Payments</h2>
        <p className="text-base-content/60 mt-1">
          Track your expenditures and invoices.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
        <div className="card-body flex flex-row items-center justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2">
              <FaWallet /> Total Expenditure
            </div>
            <div className="text-5xl font-serif font-bold text-primary">
              $<CountUp end={totalSpent} duration={2} separator="," />
            </div>
          </div>
          <div className="hidden  w-16 h-16 bg-base-200 rounded-full md:flex items-center justify-center text-2xl opacity-30">
            <FaArrowDown />
          </div>
        </div>
        <div className="h-1 w-full bg-base-200">
          <div className="h-full bg-primary w-full opacity-50"></div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-content/5">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead className="bg-base-200/50 font-serif text-base-content text-sm uppercase tracking-wider">
              <tr>
                <th>Date</th>
                <th>Service Description</th>
                <th>Transaction Reference</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-base-200/30 transition-colors border-b border-base-content/5"
                >
                  <td className="font-mono text-sm opacity-70">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="font-bold">{payment.serviceName}</div>
                    <div className="text-xs opacity-50">
                      Booking ID: {payment._id.slice(-6)}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-mono text-xs p-3 gap-2">
                      <FaReceipt className="opacity-50" />{" "}
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="text-right font-bold text-lg">
                    ${payment.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <FaWallet className="mx-auto text-4xl mb-4 opacity-20" />
            <p>No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentHistory;
