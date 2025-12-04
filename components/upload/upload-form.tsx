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
      console.log("error occured while uploading", err);

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
    console.log("Form submitted");

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("Invalid PDF", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid PDF",
        });
        return;
      }

      toast("Uploading PDF...", {
        description: "Your PDF is being uploaded. This may take a few seconds.",
      });

      const resp = await startUpload([file]);

      if (!resp) {
        toast.error("Upload failed", {
          description: "Please use a different file.",
        });
        return;
      }

      toast("Processing PDF...", {
        description: "Hang tight! Our AI is reading through your document.",
      });

      const result = await generatePdfSummary(resp);
      const { data = null } = result || {};

      if (data) {
        let storeResult;
        toast.success(" Saving PDF", {
          description: "Hang tight! We're saving your summarized PDF.✨",
        });
      

        const fileUrl = resp[0].serverData.file.url;
  const userId = resp[0].serverData.userId;
  const fileName = file.name;
  const title = file.name.replace(/\.pdf$/i, "");

      
        if(data.summary){
        storeResult= await storePdfSummaryAction({
        userId,
        fileUrl,
        summary: data.summary,
        title,
        fileName,
          });
          toast.success("Summary generated",{
            description:"Your PDF summary has been saved successfully! 🎉",
          }); 
          formRef.current?.reset();
        }
    } 
  }
      catch (err) {
      console.error("error occured during submission", err);
      formRef.current?.reset();
    } 
    finally {
      // ⬅️ THIS FIXES YOUR LOADING ISSUE
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
