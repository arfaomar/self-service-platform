import {
    Table, TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@components/ui/Table";
import Image from "next/image";
import { Skeleton } from "@components/ui/Skeleton";

export interface MyEquipmentTableProp {
    imageUrl: string;
    name: string;
    description: string;
    purchaseDate: Date;
}

export default function MyEquipmentTable({
    equipmentProps,
}: {
    equipmentProps: MyEquipmentTableProp[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={"w-1/12"}>Image</TableHead>
                    <TableHead className={"w-1/12"}>Name</TableHead>
                    <TableHead className={"w-5/12"}>Description</TableHead>
                    <TableHead className={"w-1/12"}>Purchase Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {equipmentProps.map((equipmentProp, index) => (
                    <TableRow key={index}>
                        <TableCell className={"w-1/12"}>
                            {equipmentProp.imageUrl ? (
                                <Image
                                    src={equipmentProp.imageUrl}
                                    alt={equipmentProp.name}
                                    className={"rounded-lg w-16 h-16  bg-background text-center content-center"}
                                    width={64}
                                    height={64}
                                />
                            ) : (
                                <Skeleton
                                    className="rounded-lg w-16 h-16  bg-background text-center content-center">
                                    <div>No Image</div>
                                </Skeleton>
                            )}
                        </TableCell>
                        <TableCell className={"w-2/12"}>
                            {equipmentProp.name}
                        </TableCell>
                        <TableCell className={"w-2/12"}>
                            {equipmentProp.description}
                        </TableCell>
                        <TableCell className={"w-2/12"}>
                            {equipmentProp.purchaseDate.toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
