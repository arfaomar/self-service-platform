"use client";

import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@components/ui/Sheet";
import Image from "next/image";
import { useEquipmentShopContext } from "@contexts/EquipmentShopContext";
import { ShopItemInCart } from "@lib/data/entities";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Trash2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { LoadingButton } from "@components/ui/LoadingButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import submitEquipmentRequestAction from "@actions/submitEquipmentRequestAction";

export default function ShoppingCardContent() {
    const { setArticlesInShoppingCart, articlesInShoppingCart } =
        useEquipmentShopContext();

    useEffect(() => {
        const savedCart = sessionStorage.getItem("articlesInShoppingCart");
        if (savedCart) {
            setArticlesInShoppingCart(JSON.parse(savedCart));
        }
    }, [setArticlesInShoppingCart]);

    useEffect(() => {
        sessionStorage.setItem(
            "articlesInShoppingCart",
            JSON.stringify(articlesInShoppingCart),
        );
    }, [articlesInShoppingCart]);

    const handleRemove = (id: number) => {
        setArticlesInShoppingCart(
            articlesInShoppingCart.filter(
                (article: ShopItemInCart) => article.id !== id,
            ),
        );
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setArticlesInShoppingCart(
            articlesInShoppingCart
                .map((article: ShopItemInCart) =>
                    article.id === id ? { ...article, quantity } : article,
                )
                .filter((article: ShopItemInCart) => article.quantity > 0),
        );
    };

    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
        redirectUrl?: string;
    } = {
        message: "",
    };

    const [state, formAction, isPending] = useActionState(
        submitEquipmentRequestAction,
        initialState,
    );

    const router = useRouter();

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (state && "success" in state && state.message !== "") {
            toast.success(state.message);
            setArticlesInShoppingCart([]);
            if (state.redirectUrl) {
                router.push(state.redirectUrl);
            }
        }
    }, [state, router, setArticlesInShoppingCart]);

    return (
        <SheetContent>
            <SheetHeader className={"mb-6"}>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                    View and manage your shopping cart
                </SheetDescription>
            </SheetHeader>
            {articlesInShoppingCart.length === 0 ? (
                <div>Your shopping cart is empty</div>
            ) : (
                articlesInShoppingCart.map((article: ShopItemInCart) => (
                    <div
                        className={
                            "p-4 border-y flex justify-between items-start w-full"
                        }
                        key={article.id}
                    >
                        <Image
                            src={String(article.url)}
                            alt={article.name}
                            width={50}
                            height={50}
                        />
                        <span>
                            <p className={"text-xl font-medium"}>
                                {article.name}
                            </p>
                            <p className={"text-sm text-muted-foreground"}>
                                {article.description}
                            </p>
                        </span>

                        <div className={"flex flex-col space-y-2"}>
                            <Input
                                type={"number"}
                                value={article.quantity || 0}
                                onChange={(e) =>
                                    handleQuantityChange(
                                        article.id,
                                        Number(e.target.value),
                                    )
                                }
                                size={2}
                                className={"w-fit"}
                            />
                            <Button
                                variant={"ghost"}
                                onClick={() => handleRemove(article.id)}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                ))
            )}

            {articlesInShoppingCart.length > 0 && (
                <div className={"mt-4 flex justify-evenly items-center"}>
                    <form action={formAction}>
                        <LoadingButton
                            loading={isPending}
                            type={"submit"}
                            name="articlesInShoppingCart"
                            value={JSON.stringify(articlesInShoppingCart)}
                        >
                            Submit Request
                        </LoadingButton>
                    </form>
                    <Button variant={"destructive"} onClick={() => setArticlesInShoppingCart([])}>
                        Clear Cart
                    </Button>
                </div>
            )}
        </SheetContent>
    );
}
