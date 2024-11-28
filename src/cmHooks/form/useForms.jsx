import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { Textarea } from "@/components/ui/textarea"


const createFormSchema = (fields) => {
    const schemaFields = {};

    fields.forEach(field => {
        switch (field.type) {
            case 'email':
                schemaFields[field.name] = z.string().email("Invalid email address");
                break;
            case 'password':
                schemaFields[field.name] = z.string().min(6, "Password must be at least 6 characters");
                break;
            case 'checkbox':
                schemaFields[field.name] = z.boolean().optional();
                break;
            case 'textarea':
                schemaFields[field.name] = z.string().optional();
                break;
            default:
                schemaFields[field.name] = z.string().min(1, `${field.label} is required`);
        }
    });

    return z.object(schemaFields);
};

// Render different input types
const renderInputByType = (fieldConfig, field) => {
    switch (fieldConfig.type) {
        case 'textarea':
            return (
                <Textarea
                    placeholder={fieldConfig.placeholder || fieldConfig.label}
                    {...field}
                />
            );
        case 'checkbox':
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={fieldConfig.name}
                    />
                    <label htmlFor={fieldConfig.name}>{fieldConfig.label}</label>
                </div>
            );
        case 'select':
            return (
                <select
                    {...field}
                    className="w-full p-2 border rounded"
                >
                    {fieldConfig.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        default:
            return (
                <Input
                    type={fieldConfig.type || 'text'}
                    placeholder={fieldConfig.placeholder || fieldConfig.label}
                    {...field}
                />
            );
    }
};

// Custom hook for form management
function useForms(
    initialFields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' }
    ]
) {
    // Dynamically create schema based on fields
    const formSchema = createFormSchema(initialFields);

    // Initialize the form with react-hook-form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialFields.reduce((acc, field) => {
            // Set default values based on field type
            switch (field.type) {
                case 'checkbox':
                    acc[field.name] = false;
                    break;
                case 'textarea':
                    acc[field.name] = '';
                    break;
                default:
                    acc[field.name] = '';
            }
            return acc;
        }, {})
    });

    // Dynamically render form fields
    const renderFields = initialFields.map((fieldConfig) => (
        <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
                <FormItem>
                    {fieldConfig.type !== 'checkbox' && (
                        <FormLabel>{fieldConfig.label}</FormLabel>
                    )}
                    <FormControl>
                        {renderInputByType(fieldConfig, field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    ));

    return {
        form,
        renderFields,
        handleSubmit: form.handleSubmit
    };
}

export default useForms
