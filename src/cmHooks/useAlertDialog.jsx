import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCallback, useState } from "react";



const useAlertDialog = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [content, setContent] = useState(null);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const AlertDialogJSX = (trigger, localContent, footer = null, handleContinue, onCancelText = "cancel", onContinueText = "continue") => {

        return (<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {footer && (
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsOpen(false)}
                        >{onCancelText}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}>{onContinueText}</AlertDialogAction>
                    </AlertDialogFooter>
                )}

            </AlertDialogContent>
        </AlertDialog>
        )
    }


    return {
        open,
        close,
        AlertDialogJSX,
        setTitle,
        setDescription,

    }
}

export default useAlertDialog