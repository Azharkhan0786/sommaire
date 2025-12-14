import { FileText } from "lucide-react";

export default function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
            <FileText className="h-4 w-4"/>
        </div>
    </div>
  )
}
