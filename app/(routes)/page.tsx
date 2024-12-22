"use server"
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
    const data = await auth();
    console.log(data); // Log the entire data object to inspect its contents

    const userId = data.userId;
    const orgId = data?.orgId;
    const orgName = data?.orgSlug;

    return (
        <div>
            <p>Hi there {userId}!</p>
            {orgId ? (
                <p>Your organization ID is {orgId} and the name is {orgName}.</p>
            ) : (
                <p>You are not part of any organization.</p>
            )}
        </div>
    );
}