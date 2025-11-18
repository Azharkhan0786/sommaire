import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-[40vh]:">
      <div className="py-12 lg:py-20 mx-auto px-4   sm:px-6 lg:px-8 max-w-5xl lg:pt-12">
        <SignIn />
      </div>
    </section>
  );
}
