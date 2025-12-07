"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSummary } from "@/actions/summary-actions";
import { toast } from "sonner";
import { title } from "process";

interface DeleteButtonProps{
  summaryId:string;
}

export default function DeleteButton({summaryId}:DeleteButtonProps) {
  const [open, setOpen] = useState(false);

const handleDelete=async()=>{
    //TODO:Delete Summary
    //TODO:deletesummary(summaryId);
    const result =await deleteSummary({summaryId});
    if(!result.success)
   toast.error("Error", {
  description: "Something went wrong while deleting.",
});
    

    setOpen(false); //closing the dialog as well with deleting the summary
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger must have exactly ONE React element as child */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-100 text-gray-400 border border-gray-200
                     hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Force it on top + give it a solid background, border, and shadow */}
      <DialogContent
        className=" bg-white dark:bg-slate-900 border border-gray-200
                   rounded-xl shadow-xl max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you Sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="ghost"
            className="bg-gray-50 border border-gray-200
                     hover:text-gray-600 hover:bg-rose-50"
                    onClick={()=> setOpen(false)}
                  >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
          >
            Delete{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
