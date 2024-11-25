import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"

const useAlert = (initialValues = {}) => {
    const [variant, setVariant] = useState(initialValues.variant || "default")
    const [icon, setIcon] = useState(initialValues.icon || null)
    const [title, setTitle] = useState(initialValues.title || null)
    const [description, setDescription] = useState(initialValues.description || null)

    const alertJSX = () => {
        return (
            <Alert variant={variant}>
                {icon}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        )
    }

    return { alertJSX, variant, setVariant, icon, setIcon, title, setTitle, description, setDescription }
}

export default useAlert