import { cn } from "@/lib/utils";
import Link from "next/link";

type PriceType = {
  name: string;
  price: number | string;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans = [
  {
    name: "basic",
    price: "9",
    description: "Perfect for occasional use",
    items: [
      "5PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "pro",
    price: "19",
    description: "Perfect for professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing speed",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg">
      <div className={cn(" relative flex flex-col  gap-4 lg:gap-8 p-8  h-full  border-[1px] border-gray-500/20 rounded-2xl",
        id === "pro" && "border-rose-500 border-2 gap-5"
      )}>
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div>
          <p>{price}</p>
          </div>
            <div>
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </div>
            <div>
              <Link href={paymentLink}>Buy Now</Link>
            </div>
          </div>
        </div>
     
    
  );
};

export default function PricingSection() {
  return (
    <section>
      <div>
        <div className="py-12 lg:py-24 mx-auto px-4   sm:px-6 lg:px-8 max-w-5xl lg:pt-12">
          <div>
            <h2>Pricing</h2>
          </div>
          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
