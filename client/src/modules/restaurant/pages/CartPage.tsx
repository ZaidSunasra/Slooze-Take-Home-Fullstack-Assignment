import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SideBar from "@/components/Sidebar";
import { useCart } from "@/context/CartContext";
import { useAddOrder } from "@/api/order/order.mutation";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { usePermissions } from "@/context/PermissionContext";
import PaymentMethodSelector from "@/modules/payment/components/PaymentMethodSelector";

const CartPage = () => {

    const [dialog, setDialog] = useState<boolean>(false);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const { items, totalAmount, updateQuantity, removeItem, clearCart, restaurantId, countryId } = useCart();
    const {user} = useUser();
    const {canView} = usePermissions();
    const addOrder = useAddOrder();

    const decreaseQty = (itemId: number, currentQty: number) => {
        if (currentQty <= 1) {
            removeItem(itemId);
        } else {
            updateQuantity(itemId, currentQty - 1);
        }
    };

    const handleAddOrder = () => {
        const payload = {
            restaurant_id: restaurantId as number,
            country_id: countryId as number,
            total_amount: totalAmount,
            items: items.map(({ name, ...rest }) => rest),
        };
        addOrder.mutate(payload, {
            onSuccess: () => clearCart()
        });
    }

    return (
        <div className="bg-accent min-h-screen flex">
            <SideBar />
            <div className="flex-1 p-6 max-w-5xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Your Cart
                    </h1>
                    {items.length > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>
                    )}
                </div>
                {items.length === 0 ? (
                    <div className="rounded-lg bg-background p-10 text-center text-muted-foreground shadow">
                        Your cart is empty
                    </div>
                ) : (
                    <div className="rounded-lg bg-background shadow">
                        <div className="grid grid-cols-6 gap-4 border-b px-6 py-3 text-sm font-medium text-muted-foreground">
                            <span className="col-span-2">Item</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Subtotal</span>
                            <span></span>
                        </div>
                        {items.map((item) => (
                            <div
                                key={item.item_id}
                                className="grid grid-cols-6 gap-4 px-6 py-4 items-center border-b last:border-none"
                            >
                                <span className="col-span-2 font-medium capitalize">
                                    {item.name}
                                </span>
                                <span>₹{item.price}</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => decreaseQty(item.item_id, item.quantity)}
                                        className="h-8 w-8"
                                    >
                                        <Minus />
                                    </Button>
                                    <span className="w-6 text-center font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            updateQuantity(
                                                item.item_id,
                                                item.quantity + 1
                                            )
                                        }
                                        className="h-8 w-8"
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                                <span className="font-semibold">
                                    ₹{item.price * item.quantity}
                                </span>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeItem(item.item_id)}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
                            <span className="text-lg font-semibold">
                                Total
                            </span>
                            <span className="text-xl font-bold">
                                ₹{totalAmount}
                            </span>
                        </div>
                    </div>
                )}
                {items.length > 0 && (
                    <div className="mt-6 flex justify-end">
                        <Button size="lg" className="px-10" onClick={() => setDialog(true)} >
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-106.25  bg-white">
                    <DialogHeader>
                        <DialogTitle>{user?.role === "member" ? "Add Order" : "Choose Payment"}</DialogTitle>
                        <DialogDescription>{user?.role === "member" ? "" : "Choose payment method to place order"}</DialogDescription>
                    </DialogHeader>
                    {user?.role && canView(user.role, "place_order") &&
                        <div >
                            <PaymentMethodSelector selectedPaymentId={paymentId} onSelectPayment={setPaymentId} />
                        </div>
                    }
                    <DialogFooter>
                        {(paymentId || user?.role === "member") &&
                            <Button type="submit" className="bg-green-400 hover:bg-green-500" onClick={handleAddOrder} >
                                Place Order
                            </Button>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CartPage;
