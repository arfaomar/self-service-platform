"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { Textarea } from "@components/ui/Textarea";
import { useActionState, useEffect } from "react";
import { submitTicketFormSchema } from "@lib/formSchemas";
import submitTicketAction from "@actions/submitTicketAction";
import { LoadingButton } from "@components/ui/LoadingButton";
import { toast } from "sonner";

export default function SubmitTicketForm() {
    const form = useForm<z.infer<typeof submitTicketFormSchema>>({
        resolver: zodResolver(submitTicketFormSchema),
    });

    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction, isPending] = useActionState(
        submitTicketAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (state && "success" in state && state.message !== "") {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <Form {...form}>
            <form
                action={formAction}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <FormField
                            control={form.control}
                            name="ticketTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Topic"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description of Issue
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <FormField
                            control={form.control}
                            name="ticketDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your issue here"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Max. 500 chars, min. 10 chars
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <LoadingButton loading={isPending} type="submit">
                    Submit
                </LoadingButton>
            </form>
        </Form>
    );
}
