"use client";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 24 mb",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Upload successful!", {
        description: "Your PDF was uploaded successfully.",
      });
    },

    onUploadError: (err) => {
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },

    onUploadBegin: () => {
      console.log("upload has begun");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validated = schema.safeParse({ file });
      if (!validated.success) {
        toast.error("Invalid PDF", {
          description: validated.error.flatten().fieldErrors.file?.[0],
        });
        return;
      }

      toast("Uploading PDF...");
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Upload failed.");
        return;
      }

      toast("Processing PDF...");
      const result = await generatePdfSummary(resp);

      const { data = null } = result || {};
      if (!data?.summary) {
        toast.error("Failed to generate summary.");
        return;
      }

      toast.success("Saving summary...");

      const fileUrl = resp[0].serverData.file.url;
      const userId = resp[0].serverData.userId;
      const fileName = file.name;
      const title = file.name.replace(".pdf", "");

      await storePdfSummaryAction({
        userId,
        fileUrl,
        summary: data.summary,
        title,
        fileName,
      });

      toast.success("PDF summary saved successfully!");
      formRef.current?.reset();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong.");
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl gap-8 flex flex-col">
      <UploadFormInput 
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
