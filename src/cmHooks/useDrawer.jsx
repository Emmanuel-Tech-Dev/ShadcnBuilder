import { useCallback, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";


const useDrawer = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(null);
    const [height, setHeight] = useState("")


    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);


    const DrawerJSX = (trigger, localContent) => {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen} >
                {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
                <DrawerContent className={`h-[${height}]`}>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4">
                        {localContent || content}
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        )
    }

    return {
        isOpen,
        open,
        close,
        setTitle,
        setDescription,
        setContent,
        setHeight,
        DrawerJSX

    }
}

export default useDrawer