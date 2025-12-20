export type PriceType = {
  name: string;
  price: number | string;
  description: string;
  items: string[];
  id: "basic" | "pro";
};

export const pricingPlans: PriceType[] = [
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
