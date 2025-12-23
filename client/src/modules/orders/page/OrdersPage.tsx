import { FetchOrders } from "@/api/order/order.queries";
import SideBar from "@/components/Sidebar";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {

  const { data, isPending, isError } = FetchOrders();

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
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
