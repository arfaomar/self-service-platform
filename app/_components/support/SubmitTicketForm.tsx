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
import { useRef } from "react";

export default function SubmitTicketForm() {
    const form = useForm<z.infer<typeof submitTicketFormSchema>>({
        resolver: zodResolver(submitTicketFormSchema),
        defaultValues: {
            ticketTitle: "",
            ticketDescription: "",
        },
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

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form {...form}>
            <h1 className="text-3xl font-semibold text-center">
                Submit a Ticket
            </h1>
            <form
                ref={formRef}
                onSubmit={form.handleSubmit(() => formRef.current?.submit())}
                action={formAction}
                className="space-y-8 grid-cols-1 items-center justify-center my-10 max-w-4xl mx-auto"
            >
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
