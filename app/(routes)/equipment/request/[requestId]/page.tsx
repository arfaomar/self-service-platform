"use server";

export default async function RequestPage({
    params,
}: {
    params: Promise<{ requestId: string }>;
}) {
    const requestId = (await params).requestId;
    return <div>Request - {requestId}</div>;
}
