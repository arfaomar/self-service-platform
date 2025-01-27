"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { ShopItemCategory } from "@lib/data/entities/ShopItemCategory";
import { startTransition, useActionState } from "react";
import editCategoryAction from "@components/admin/editCategoryAction";
import { LoadingButton } from "@components/ui/LoadingButton";

const editCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
});

interface EditCategoryFormProps {
    category: ShopItemCategory;
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
    const form = useForm<z.infer<typeof editCategorySchema>>({
        resolver: zodResolver(editCategorySchema),
        defaultValues: {
            name: category.name || "",
        },
    });

    const initialState = 0;

    const [state, formAction, isPending] = useActionState(
        editCategoryAction,
        initialState,
    );

    const onSubmit = (data: z.infer<typeof editCategorySchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        startTransition(() => {
            formAction();
        });
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    loading={isPending}
                    type={"submit"}
                    className={"w-full"}
                >
                    Submit
                </LoadingButton>
            </form>
        </Form>
    );
}