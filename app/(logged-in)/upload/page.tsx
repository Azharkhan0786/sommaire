import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPriceId } from "@/lib/user";
import { getSummaries } from "@/lib/summaries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default async function Page() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) return redirect("/sign-in");

  const email = user.emailAddresses?.[0]?.emailAddress || "";
  const priceId = email ? await getPriceId(email) : null;
  const uploadLimit = 5;
  const summaries = await getSummaries(userId);
  const hasReachedLimit = priceId === "basic" && summaries.length >= uploadLimit;

  if (hasReachedLimit) {
    return (
      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col justify-center items-center text-center gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Upload Limit Reached
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You've reached the limit of {uploadLimit} uploads on the Basic Plan.
                Upgrade to Pro for unlimited uploads and premium features.
              </p>
              <div className="bg-rose-50 border border-rose-300 rounded-lg p-6 text-rose-800 mb-8">
                <p className="text-sm">
                  <Link
                    href="/#pricing"
                    className="text-rose-800 underline font-medium items-center underline-offset-2 inline-flex"
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowRight className="w-4 h-4 inline-block ml-1" />
                  </Link>{" "}
                  for unlimited uploads
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                View Your Summaries
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col justify-center items-center  text-center gap-6">
       <UploadHeader />
       <UploadForm />
      </div>
      </div>
    </section>
  );
}
