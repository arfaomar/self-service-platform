import { auth } from "@clerk/nextjs/server";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";

export default async function MyTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>Equipment List</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
        </section>
    );
}
