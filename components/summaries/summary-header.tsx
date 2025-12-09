import { Button } from "../ui/button"

export default function SummaryHeader({title}:{title:string}){
    return( 
    <div className="flex gap-4 mb-4 justify-between">
        <div></div>
        <div >
            <Button variant={'link'} size={'sm'} className="">

            </Button>
        </div>
    </div>
    )
}