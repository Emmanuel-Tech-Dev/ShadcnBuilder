import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";


import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react";

const useCommand = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(null);
    const [height, setHeight] = useState("")
    const [width, setWidth] = useState("")


    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);



    useEffect(() => {

        const keyDown = (e) => {
            if (e.key === "/" && !e.shiftKey) {
                e.preventDefault()
                setIsOpen(true)
            }
        }

        document.addEventListener("keydown", keyDown)

        return () => document.removeEventListener("keydown", keyDown)

    }, [])

    const CommandJSX = (data, key = "key") => {

        const [searchQuery, setSearchQuery] = useState('')


        const filterData = searchQuery
            ?
            data?.filter(item => item[key].toLowerCase().includes(searchQuery.toLowerCase()))
            : data?.slice(0, 4)



        return (

            <Command>
                <CommandInput placeholder="Type a command or search..."
                    value={searchQuery}
                    onValueChange={setSearchQuery} // Update the query on input change
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {filterData?.map((suggestion, index) => {
                            return (
                                <CommandItem key={index}>
                                    {suggestion[key]} <CommandShortcut>⌘B</CommandShortcut>
                                </CommandItem>
                            )
                        })}

                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>


        )
    }

    const CommandDialogJSX = (data, key = 'key') => {

        const [searchQuery, setSearchQuery] = useState('')


        const filterData = searchQuery
            ?
            data?.filter(item => item[key].toLowerCase().includes(searchQuery.toLowerCase()))
            : data?.slice(0, 4)

        return (
            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTitle className="hidden">Search Commands</DialogTitle>
                <DialogDescription className="hidden">Type a command or search term below</DialogDescription>

                <CommandInput placeholder="Type a command or search..."
                    value={searchQuery}
                    onValueChange={setSearchQuery} // Update the query on input change
                />
                <CommandList>
                    {filterData.length === 0 ? (
                        <CommandEmpty>No results found.</CommandEmpty>
                    ) : (
                        <CommandGroup heading="Suggestions">
                            {filterData?.map((suggestion, index) => {
                                return (

                                    <CommandItem key={index}>
                                        {suggestion[key]} <CommandShortcut>⌘B</CommandShortcut>
                                    </CommandItem>
                                )
                            })}
                            <CommandItem>
                                <Calendar />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <Smile />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <Calculator />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                    )}


                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        )
    }


    return {

        open,
        close,
        title,
        setTitle,
        description,
        setDescription,
        content,
        setContent,
        height,
        setHeight,
        width,
        setWidth,
        CommandJSX,
        CommandDialogJSX
    }
}



export default useCommand