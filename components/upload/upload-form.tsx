"use client";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { on } from "events";

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
  const { startUpload } = useUploadThing("pdfUploader",
    {
    onClientUploadComplete: () => {
      console.log("Upload complete");
  },
  onUploadError: (error) => {
    console.error("Upload error:", error);
},
onUploadBegin: () => {
    console.log("Upload started");
}
});

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validating a file
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields)

    if (!validatedFields.success) {
      console.log("Invalid file");
      return
    }

    const resp=await startUpload([file]);
    if (!resp) {
      console.log("Upload failed");
      return
    }
    //parse the file using langchain
    //summarise the pdf using AI
    //save the summary to the database
    // redirect ti {id} of the summary page
  };
  return (
    <div className=" w-full max-w-2xl gap-8 flex flex-col">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  )};


