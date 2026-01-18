import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CART_STATUS_BG } from "@/utils/customStyle";
import { usePermissions } from "@/context/PermissionContext";
import { useUser } from "@/context/UserContext";
import type { Cart, CartItemDb } from "@/api/order/order.type";
import { useCancelOrder, usePlaceOrder } from "@/api/order/order.mutation";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PaymentMethodSelector from "@/modules/payment/components/PaymentMethodSelector";
import { useCart } from "@/context/CartContext";

type OrderCardProps = {
    order: Cart & {
        items: (CartItemDb)[],
        restaurant: { name: string },
        created_by: { name: string }
    };
};

const OrderCard = ({ order }: OrderCardProps) => {

    const { user } = useUser();
    const { canView } = usePermissions();
    const { addItem, enableSharedCart, saveCartId, clearCart } = useCart()
    const cancelOrder = useCancelOrder();
    const placeOrder = usePlaceOrder();

    const [dialog, setDialog] = useState<{ open: boolean; data: string | null; action: "cancel" | "place" | null }>({ open: false, data: null, action: null });
    const [paymentId, setPaymentId] = useState<string | null>(null);

    const onCancel = (id: string) => {
        cancelOrder.mutate(id, {
            onSuccess: () => setDialog({ open: false, data: null, action: null })
        })
    }

    const onPlace = (id: string) => {
        placeOrder.mutate(id, {
            onSuccess: () => {
                setDialog({ open: false, data: null, action: null });
                setPaymentId(null);
            },
        });
    };

    return (
        <div className="rounded-xl bg-background shadow-sm border p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold capitalize">
                        {order.restaurant.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                        Created by: {order.created_by.name}
                    </p>
                </div>
                {order.is_shared && order.status != "shared" &&
                    <Badge className={`bg-blue-200 text-blue-800 font-semibold text-sm`}>
                        Shared Cart
                    </Badge>
                }
                <Badge className={`${CART_STATUS_BG[order.status]} font-semibold text-sm`}>
                    Status: {order.status}
                </Badge>
                {order.status === "shared" &&
                    <Button
                        className="bg-blue-200 text-blue-800 hover:bg-blue-300 hover:text-blue-700"
                        onClick={() => {
                            clearCart(),
                                saveCartId(order.id),
                                enableSharedCart(),
                                order.items.forEach((item) => {
                                    addItem(
                                        {
                                            item_id: item.item_id,
                                            name: item.item.name,
                                            price: item.price,
                                            quantity: item.quantity,
                                            user_id: item.user_id
                                        },
                                        order.country_id,
                                        order.restaurant_id
                                    );
                                });
                        }}>Add Items</Button>
                }
            </div>
            <div className="space-y-2">
                {order.items.map((item: CartItemDb) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="text-muted-foreground capitalize leading-tight">
                            <div className="font-medium text-foreground">
                                {item.item.name} x{item.quantity}
                            </div>
                            {order.is_shared &&
                                <div className="text-xs text-muted-foreground">
                                    ordered by {item.added_by.name}
                                </div>
                            }
                        </div>
                        <span className="font-medium">
                            ₹{item.price * item.quantity}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground font-semibold">Total</span>
                <span className="text-lg font-bold">₹{order.total_amount}</span>
            </div>
            <div className="flex justify-end gap-4">
                {user?.role &&
                    canView(user.role, "place_order") &&
                    order.status !== "placed" && (
                        <Button
                            className="bg-green-400 hover:bg-green-500"
                            onClick={() => setDialog({ open: true, data: String(order.id), action: "place" })}
                        >
                            Place Order
                        </Button>
                    )}
                {user?.role &&
                    canView(user.role, "cancel_order") &&
                    order.status !== "cancelled" && (
                        <Button
                            variant="destructive"
                            onClick={() => setDialog({ open: true, data: String(order.id), action: "cancel" })}
                        >
                            Cancel Order
                        </Button>
                    )}
            </div>
            <Dialog open={dialog.open} onOpenChange={(open) => setDialog((prev) => ({ ...prev, open, ...(open ? {} : { data: null, action: null }) }))}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-106.25  bg-white">
                    {dialog.action == "cancel" ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Cancel Order</DialogTitle>
                                <DialogDescription>Are you sure you want to cancel? This cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" variant="destructive" onClick={() => onCancel(String(dialog.data))} disabled={cancelOrder.isPending}>
                                    Cancel Order
                                </Button>
                            </DialogFooter>
                        </>
                    ) : dialog.action === "place" ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Choose Payment</DialogTitle>
                                <DialogDescription>Choose payment method to place order</DialogDescription>
                            </DialogHeader>
                            {user?.role && canView(user.role, "place_order") &&
                                <div >
                                    <PaymentMethodSelector selectedPaymentId={paymentId} onSelectPayment={setPaymentId} />
                                </div>
                            }
                            <DialogFooter>
                                {paymentId &&
                                    <Button type="submit" className="bg-green-400 hover:bg-green-500" onClick={() => onPlace(String(dialog.data))} disabled={placeOrder.isPending}>
                                        Place Order
                                    </Button>
                                }
                            </DialogFooter>
                        </>
                    ) : (
                        <></>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OrderCard;
