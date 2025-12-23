import type { GetRestaurant, Restaurant, RestaurantItem } from "@/api/restaurant/restaurant.type"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { Minus, Plus, Store } from "lucide-react"

const RestaurantCard = ({ restaurants }: { restaurants: GetRestaurant }) => {

    const { items, addItem, updateQuantity, removeItem} = useCart();

    const getQuantity = (itemId: number) => {
        return items.find((i) => i.item_id === itemId)?.quantity ?? 0;
    };

    const addToCart = (item: RestaurantItem, restaurant: Restaurant) => {
        addItem(
            {
                item_id: item.id,
                price: item.price,
                quantity: 1,
                name: item.name
            },
            restaurant.country_id,
            restaurant.id,
        );
    };

    const increaseQty = (itemId: number) => {
        const currentQty = getQuantity(itemId);
        updateQuantity(itemId, currentQty + 1);
    };

    const decreaseQty = (itemId: number) => {
        const currentQty = getQuantity(itemId);
        if (currentQty <= 1) {
            removeItem(itemId);
        } else {
            updateQuantity(itemId, currentQty - 1);
        }
    };

    return (
        <div className="space-y-3">
            {restaurants.map((restaurant) => {
                return (
                    <Card key={restaurant.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full ">
                                    <Store className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-balance text-lg font-semibold capitalize tracking-tight text-foreground">
                                        {restaurant.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">{restaurant.items.length} menu items</p>
                                </div>
                            </div>
                        </CardContent>
                        <div className="border-t bg-muted/20 px-4 py-4">
                            <div className="space-y-2">
                                {restaurant.items.map((item) => {
                                    const quantity = getQuantity(item.id);

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg bg-background px-4 py-3 shadow-sm transition-colors hover:bg-muted"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium capitalize text-foreground">
                                                    {item.name}
                                                </span>
                                                <span className="text-sm font-semibold text-muted-foreground">
                                                    ₹{item.price}
                                                </span>
                                            </div>
                                            {quantity > 0 ? (
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        onClick={() => decreaseQty(item.id)}
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-base font-semibold w-5 text-center">
                                                        {quantity}
                                                    </span>
                                                    <Button
                                                        onClick={() => increaseQty(item.id)}
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={() => addToCart(item, restaurant)}
                                                    size="sm"
                                                    className="px-4"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default RestaurantCard