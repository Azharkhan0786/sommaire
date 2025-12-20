import { getPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export const revalidate = 0;



export default async function PlanBadge() {
  const user = await currentUser();

  

  if (!user?.id) return null;

  const email = user.emailAddresses?.[0]?.emailAddress || "";
  const priceId = email ? await getPriceId(email) : null;


  console.log("🔥 PRICE ID FROM DB:", priceId);

  let planName = "Buy a plan";

  if (priceId === "basic") planName = "Basic Plan";
  if (priceId === "pro") planName = "Pro Plan";

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 hidden lg:flex items-center gap-1 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300",
        !priceId && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3",
          priceId ? "text-amber-600" : "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}
