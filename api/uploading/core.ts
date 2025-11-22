import { metadata } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, FileRouter, UploadThingError } from "uploadthing/server";

const f=createUploadthing();

export const ourFileRouter={
    pdfUploader:f({pdf:{maxFileSize:'32MB'}})
    .middleware(
        async({req})=>{
            //get user info
            const user=await currentUser();
            if(!user) throw new UploadThingError("Unauthorized");

            return {userId:user.id};
        }
    ).onUploadComplete(async({metadata,file}) => {
        console.log("Upload complete for user:",metadata.userId);
        return {userId:metadata.userId,file:file.ufsUrl};   
    })
} satisfies FileRouter;

export type OurFileRouter=typeof ourFileRouter;