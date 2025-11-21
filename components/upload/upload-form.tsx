'use client';
import {Button} from "@/components/ui/button"
import UploadFormInput from "./upload-form-input";

export default function UploadForm(){

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("Form submitted");
        const formData=new FormData(e.currentTarget);
        const file=formData.get("file") as File;

       //validating a file
        //schema with zod
        //upload the file to uploadThing
        //parse the file using langchain
        //summarise the pdf using AI
        //save the summary to the database
        // redirect ti {id} of the summary page
    }
    return (
        <div className=" w-full max-w-2xl gap-8 flex flex-col">
      <UploadFormInput onSubmit={handleSubmit} />
        </div>
    
    );

}