
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";


const useCard = (content = { width: "w-full sm:w-[350px]" }) => {


    const defaultContent = {
        width: "w-full sm:w-[350px]",
        ...content,
    };



    const [cardContent, setCardContent] = useState(defaultContent);




    const CardJSX = (key, localContent, footerContent) => {
        return (
            <div key={key} className={`${cardContent.width} p-2`}>
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{cardContent?.title}</CardTitle>
                        <CardDescription>{cardContent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {localContent || content}
                    </CardContent>
                    {footerContent && (
                        <CardFooter>
                            {footerContent}
                        </CardFooter>
                    )}
                </Card>
            </div>
        )
    }


    return {
        CardJSX,
        setCardContent
    }


}

export default useCard