import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { forwardRef } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            required
          />

          <Button type="submit">Upload your PDF</Button>
        </div>
      </form>
    );
  }
);

// 🔥 THIS IS REQUIRED
UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
