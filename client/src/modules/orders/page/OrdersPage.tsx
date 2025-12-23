import { useCancelOrder, usePlaceOrder } from "@/api/order/order.mutation";
import { FetchOrders } from "@/api/order/order.queries";
import SideBar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/context/PermissionContext";
import { useUser } from "@/context/UserContext";
import { CART_STATUS_BG } from "@/utils/customStyle";

const OrdersPage = () => {

  const { user } = useUser();
  const { canView } = usePermissions();
  const { data, isPending, isError } = FetchOrders();
  const cancelOrder = useCancelOrder();
  const placeOrder = usePlaceOrder();

  const handleCancelOrder = (id: string) => {
    cancelOrder.mutate(id)
  }

  const handlePlaceOrder = (id: string) => {
    placeOrder.mutate(id)
  }

  if (isPending) return <>Loading...</>;
  if (isError) return <>Something went wrong</>;

  const orders = data?.orders ?? [];

  return (
    <div className="bg-accent min-h-screen flex">
      <SideBar />
      <div className="flex-1 p-6 max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-lg bg-background p-10 text-center text-muted-foreground shadow">
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl bg-background shadow-sm border p-5 space-y-4"
            >
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
                <Badge className={`${CART_STATUS_BG[order.status]}`}>
                  {order.status}
                </Badge>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground capitalize">
                      {item.item.name}
                    </span>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground font-semibold">
                  Total
                </span>
                <span className="text-lg font-bold">
                  ₹{order.total_amount}
                </span>
              </div>
              <div className="flex justify-end gap-4">
                {user?.role && canView(user.role, "place_order") && order.status !== "placed" &&
                  <Button className="bg-green-400 hover:bg-green-500" onClick={() => handlePlaceOrder(String(order.id))}>Place Order</Button>
                }
                {user?.role && canView(user.role, "cancel_order") && order.status !== "cancelled" &&
                  <Button variant="destructive" onClick={() => handleCancelOrder(String(order.id))}>Cancel Order</Button>
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
