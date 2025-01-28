import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table";
import { Request } from "@lib/data/entities";
import { ItemInRequestList } from "@lib/data/entities";

export interface MyRequestsTableProps {
    request: Request;
    items: ItemInRequestList[];
}

export default function MyRequestsTable({ requests } : { requests: MyRequestsTableProps[] }) {

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>My Requests</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {
                    requests.length > 0 ?
                        (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className={"w-1/12"}>ID</TableHead>
                                        <TableHead className={"w-2/12"}>Creation Date</TableHead>
                                        <TableHead className={"w-2/12"}>Update Date</TableHead>
                                        <TableHead className={"w-2/12"}>Status</TableHead>
                                        <TableHead className={"w-1/12"}>Requested Items</TableHead>
                                        <TableHead className={"w-1/12"}>Accepted Items</TableHead>
                                        <TableHead className={"w-1/12"}>Declined Items</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        requests.map((request, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {request.request.id}
                                                </TableCell>
                                                <TableCell>
                                                    {request.request.creationDate.toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        request.request.updateDate
                                                            ? request.request.updateDate.toLocaleDateString()
                                                            : (<span className={"text-muted-foreground"}>N/A</span>)
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {request.request.status}
                                                </TableCell>
                                                <TableCell>
                                                    {request.items.length}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={"text-muted-foreground"}>N/A</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={"text-muted-foreground"}>N/A</span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        ) : (
                            <div className={"text-center"}>
                                <h1 className={"text-muted-foreground m-16"}>No requests found</h1>
                            </div>
                        )
                }
            </div>
        </section>
    );
}