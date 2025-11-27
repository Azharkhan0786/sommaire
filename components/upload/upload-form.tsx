// "use client";
// import { Button } from "@/components/ui/button";
// import UploadFormInput from "./upload-form-input";
// import { z } from "zod";
// import { useUploadThing } from "@/utils/uploadthing";
// import { on } from "events";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid File" })
//     .refine((file) => file.size <= 24 * 1024 * 1024, {
//       message: "File size must be less than 24 mb",
//     })
//     .refine((file) => file.type.startsWith("application/pdf"), {
//       message: "File must be a PDF",
//     }),
// });

// export default function UploadForm() {
//   const { startUpload } = useUploadThing("pdfUploader",
//     {
//     onClientUploadComplete: () => {
//       console.log("Upload complete");
//   },
//   onUploadError: (error) => {
//     console.error("Upload error:", error);
// },
// onUploadBegin: () => {
//     console.log("Upload started");
// }
// });

//   const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("submitted");
//     const formData = new FormData(e.currentTarget);
//     const file = formData.get("file") as File;

//     //validating a file
//     const validatedFields = schema.safeParse({ file });

//     console.log(validatedFields)

//     if (!validatedFields.success) {
//       console.log("Invalid file");
//       return
//     }

//     const resp=await startUpload([file]);
//     if (!resp) {
//       console.log("Upload failed");
//       return
//     }
//     //parse the file using langchain
//     //summarise the pdf using AI
//     //save the summary to the database
//     // redirect ti {id} of the summary page
//   };
//   return (
//     <div className=" w-full max-w-2xl gap-8 flex flex-col">
//       <UploadFormInput onSubmit={handleSubmit} />
//     </div>
//   )};

"use client";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { string, unknown, z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";

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

    //parse the file using langchain
    const summary = await generatePdfSummary(resp);
    console.log({ summary });
    //summarise the pdf using AI
    //save the summary to the database
    // redirect to {id} of the summary page
  };

  return (
    <div className="w-full max-w-2xl gap-8 flex flex-col">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
