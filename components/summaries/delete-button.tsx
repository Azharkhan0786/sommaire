import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


export default function DeleteButton() {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="bg-gray-100 text-gray-400 border border-gray-200 hover:text-rose-600 hover:bg-rose-500 "
    >
        <Trash2 className="h-4 w-4"/>
    </Button>
  );
}
