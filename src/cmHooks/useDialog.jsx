import { useCallback, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const useDialog = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(null);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const DialogJSX = (trigger, localContent, footer = null) => {
        return (

            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
                <DialogContent>
                    {(title || description) && (
                        <DialogHeader>
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && <DialogDescription>{description}</DialogDescription>}
                        </DialogHeader>
                    )}
                    {localContent || content}

                    {footer && (
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    // Optional confirmation logic here
                                    console.log("Confirmed!");
                                    setIsOpen(false);
                                }}
                            >
                                Confirm
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>

            </Dialog>
        );
    };

    return {
        isOpen,
        open,
        close,
        setTitle,
        setDescription,
        setContent,
        DialogJSX,
    };
};

export default useDialog;
