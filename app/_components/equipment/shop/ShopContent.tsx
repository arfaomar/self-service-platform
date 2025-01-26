import { ShopItem } from "@lib/data/entities";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/Card";
import Image from "next/image";
import { Skeleton } from "@components/ui/Skeleton";

interface ShopContentProps {
    shopItems?: ShopItem[];
}

export default function ShopContent({ shopItems }: ShopContentProps) {

    return (
        <>
            {shopItems?.map((shopItem) => (
                <Card key={shopItem.id}>
                    <CardHeader className={"rounded-t-lg bg-background w-full h-48 p-0"}>
                        {shopItem.url ? (
                            <Image src={shopItem.url}
                                   alt={shopItem.name}
                                   height={256}
                                   width={256}
                                   className={"rounded-t-lg w-full h-full object-cover"}
                            />
                        ) : (
                            //<div className={"w-full h-full bg-gray-300"} />
                            <Skeleton className="rounded-b-none rounded-t-lg w-full h-full bg-background text-center content-center">
                                <div>No Image</div>
                            </Skeleton>
                        )}
                    </CardHeader>
                    <CardContent className={"flex flex-row justify-between p-3 border-t-2"}>
                        <div>
                            <CardTitle>{shopItem.name}</CardTitle>
                            <CardDescription>
                                {shopItem.description}
                            </CardDescription>
                        </div>
                        <div className={"flex flex-col text-center bg-background p-1 px-2 rounded-lg text-"}>
                            <span>Stock</span>
                            {shopItem.stock}
                        </div>
                    </CardContent>
                    <CardFooter className={"pb-2"}>
                        <button className={"mx-auto bg-secondary text-white p-1 rounded-lg"}>
                            Add to Cart
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}
