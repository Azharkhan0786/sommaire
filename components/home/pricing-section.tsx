// "use client";

// import { cn } from "@/lib/utils";
// import { pricingPlans } from "@/utils/constant";
// import { ArrowRight, CheckIcon } from "lucide-react";


// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// type PriceType = {
//   name: string;
//   price: number | string;
//   description: string;
//   items: string[];
//   id: "basic" | "pro";
// };

// const plans: PriceType[] = [
//   {
//     name: "basic",
//     price: "1",
//     description: "Perfect for occasional use",
//     items: [
//       "5 PDF summaries per month",
//       "Standard processing speed",
//       "Email support",
//     ],
//     id: "basic",
//   },
//   {
//     name: "pro",
//     price: "10",
//     description: "Perfect for professionals and teams",
//     items: [
//       "Unlimited PDF summaries",
//       "Priority processing speed",
//       "24/7 priority support",
//       "Markdown Export",
//     ],
//     id: "pro",
//   },
// ];

// // ✅ Razorpay handler (TOP LEVEL)
// const handlePayment = async (plan: "basic" | "pro") => {
//   const res = await fetch("/api/razorpay/order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       plan: plan === "basic" ? "BASIC" : "PRO",
//     }),
//   });

//   const order = await res.json();

//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     amount: order.amount,
//     currency: order.currency,
//     name: "Sommaire",
//     description: `${plan.toUpperCase()} Plan`,
//     order_id: order.id,
//     handler: function (response: any) {
//       console.log("Payment success:", response);
//       // TODO: verify payment on backend
//     },
//     theme: {
//       color: "#E11D48",
//     },
//   };

//   const razorpay = new window.Razorpay(options);
//   razorpay.open();
// };

// const PricingCard = ({
//   name,
//   price,
//   description,
//   items,
//   id,
// }: PriceType) => {
//   return (
//     <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
//       <div
//         className={cn(
//           "relative flex flex-col gap-4 lg:gap-8 p-8 h-full border border-gray-500/20 rounded-2xl",
//           id === "pro" && "border-rose-500 border-2 gap-5"
//         )}
//       >
//         <div>
//           <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
//           <p className="text-base-content/80 mt-2">{description}</p>
//         </div>

//         <div className="flex gap-2">
//           <p className="text-5xl tracking-tight font-extrabold">${price}</p>
//           <div className="flex flex-col justify-end mb-[4px]">
//             <p className="text-xs uppercase font-semibold">USD</p>
//             <p className="text-xs">/month</p>
//           </div>
//         </div>

//         <div className="space-y-2.5 leading-relaxed text-base flex-1">
//           {items.map((item, idx) => (
//             <li key={idx} className="flex items-center gap-2">
//               <CheckIcon size={18} />
//               <span>{item}</span>
//             </li>
//           ))}
//         </div>

//         {/* 🔥 Razorpay button */}
//         <button
//           onClick={() => handlePayment(id)}
//           className={cn(
//             "w-full rounded-full flex items-center justify-center gap-2 py-2 text-white bg-linear-to-r from-red-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 border-2",
//             id === "pro"
//               ? "border-rose-900"
//               : "border-rose-100 from-rose-400 to-rose-500"
//           )}
//         >
//           Buy Now <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function PricingSection() {
//   return (
//     <section className="relative overflow-hidden" id="pricing">
//       <div className="py-12 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
//         <div className="flex items-center justify-center w-full pb-12">
//           <h2>Pricing</h2>
//         </div>

//         <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
//           {pricingPlans.map((plan) => (
//             <PricingCard key={plan.id} {...plan} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PriceType = {
  name: string;
  price: number | string;
  description: string;
  items: string[];
  id: "basic" | "pro";
};

const plans: PriceType[] = [
  {
    name: "basic",
    price: "1",
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
  },
  {
    name: "pro",
    price: "10",
    description: "Perfect for professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing speed",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
  },
];

export default function PricingSection() {
  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // 🔥 Razorpay handler
  const handlePayment = async (plan: "basic" | "pro") => {
    if (!userEmail) {
      alert("Please login to continue");
      return;
    }

    // 1️⃣ Create Razorpay order
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: plan === "basic" ? "BASIC" : "PRO",
      }),
    });

    const order = await res.json();

    // 2️⃣ Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Sommaire",
      description: `${plan.toUpperCase()} Plan`,
      order_id: order.id,

      // 🔥 MOST IMPORTANT PART
      handler: async function (response: any) {
        // 3️⃣ Verify payment & update DB
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan: plan === "basic" ? "BASIC" : "PRO",
            amount: order.amount,
            email: userEmail,
          }),
        });

        const result = await verifyRes.json();

        if (result.success) {
          // 🔄 Refresh UI so PlanBadge updates
          window.location.reload();
        } else {
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#E11D48",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center justify-center w-full pb-12">
          <h2>Pricing</h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative w-full max-w-lg hover:scale-105 transition-all duration-300"
            >
              <div
                className={cn(
                  "relative flex flex-col gap-4 lg:gap-8 p-8 h-full border border-gray-500/20 rounded-2xl",
                  plan.id === "pro" && "border-rose-500 border-2 gap-5"
                )}
              >
                <div>
                  <p className="text-lg lg:text-xl font-bold capitalize">
                    {plan.name}
                  </p>
                  <p className="text-base-content/80 mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="text-5xl tracking-tight font-extrabold">
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs uppercase font-semibold">USD</p>
                    <p className="text-xs">/month</p>
                  </div>
                </div>

                <div className="space-y-2.5 leading-relaxed text-base flex-1">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckIcon size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </div>

                {/* 🔥 Buy button */}
                <button
                  onClick={() => handlePayment(plan.id)}
                  className={cn(
                    "w-full rounded-full flex items-center justify-center gap-2 py-2 text-white bg-linear-to-r from-red-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 border-2",
                    plan.id === "pro"
                      ? "border-rose-900"
                      : "border-rose-100 from-rose-400 to-rose-500"
                  )}
                >
                  Buy Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
