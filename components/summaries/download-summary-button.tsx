import { Button } from "@/components/ui/button";

export default function DownloadSummaryButton({
  title,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: string;
}) {
  return (
    <Button
      size={"sm"}
      variant={"destructive"}
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-100
      onClick={handleDownload}"
    >
      Download Summary
    </Button>
  );
}
