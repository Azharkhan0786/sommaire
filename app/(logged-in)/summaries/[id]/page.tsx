import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params=await props.params;
    const id=params.id;

    const summary=await getSummaryById(id);

    if (!summary) {
        notFound();
    }
    return <div className="relative isolate min-h-screen bg-linear-to-r from-rose-50/40 to-white"></div>;
}
