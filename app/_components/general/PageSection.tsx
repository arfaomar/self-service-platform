import React from "react";

export default function PageSection({
    children,
    title,
    contentLength,
}: {
    children: React.ReactNode;
    title: string;
    contentLength?: number;
}) {
    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>{title}</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {contentLength !== undefined ? (
                    contentLength > 0 ? (
                        children
                    ) : (
                        <div className={"text-center"}>
                            <h1 className={"text-muted-foreground m-16"}>
                                No entries found
                            </h1>
                        </div>
                    )
                ) : (
                    children
                )}
            </div>
        </section>
    );
}
