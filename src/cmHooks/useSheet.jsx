import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCallback, useState } from "react"


const useSheet = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState(null)
    const [width, setWidth] = useState("w-[400px] sm:w-[540px]")
    const [height, setHeight] = useState("") // only use when you need the height espercialy when the sheet positon is top
    const [title, setTitle] = useState()
    const [side, setSide] = useState("right")
    const [description, setDescription] = useState()

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    const SheetJSX = (trigger, localContent) => {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen} >
                {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
                <SheetContent className={width + " " + height} side={side}>
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    </SheetHeader>
                    <div>
                        {localContent || content}
                    </div>
                </SheetContent>
            </Sheet >
        )
    }


    return {
        open,
        close,
        setWidth,
        setHeight,
        setTitle,
        setDescription,
        setContent,
        setSide,
        SheetJSX
    }
}

export default useSheet