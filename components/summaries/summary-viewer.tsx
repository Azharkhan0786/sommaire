import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function SummaryViewer({ summary }: { summary: string }) {
  return (
    <Card className="border border-gray-200 shadow-md">
      {/* Header */}
      <CardHeader className="flex flex-row items-center gap-2">
        <FileText className="h-5 w-5 text-rose-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          Generated Summary
        </h2>
      </CardHeader>

      {/* Scrollable Content */}
      <CardContent>
        <div
          className="
            max-h-[60vh]
            overflow-y-auto
            pr-2
            prose prose-sm
            max-w-none
            text-gray-700
            whitespace-pre-line
          "
        >
          {summary}
        </div>
      </CardContent>
    </Card>
  );
}
