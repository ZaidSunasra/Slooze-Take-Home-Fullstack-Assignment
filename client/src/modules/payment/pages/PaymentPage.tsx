import { FetchPayments } from "@/api/payment/payment.queries";
import type { Payment } from "@/api/payment/payment.type";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import PaymentCard from "../components/PaymentCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddPaymentForm from "../components/AddPaymentForm";

const PaymentPage = () => {

    const { data, isPending, isError } = FetchPayments();

    const [dialog, setDialog] = useState<boolean>(false);

    if (isPending) return <>Loading...</>;
    if (isError) return <>Something went wrong</>;

    return (
        <div className="bg-accent min-h-screen flex">
            <SideBar />
            <div className="flex-1 p-6 space-y-6 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Payments</h1>
                    <Button onClick={() => setDialog(true)}>
                        <Plus />
                        Add New Payment
                    </Button>
                </div>
                {data?.payments?.length === 0 ? (
                    <p className="text-muted-foreground">No payment methods added.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.payments?.map((payment: Payment) => (
                            <PaymentCard key={payment.id} payment={payment} />
                        ))}
                    </div>
                )}
            </div>
            <Dialog open={dialog} onOpenChange={setDialog} >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-106.25 bg-white">
                    <DialogHeader>
                        <DialogTitle>Add Payment</DialogTitle>
                        <DialogDescription>Add payment details to add new payment</DialogDescription>
                    </DialogHeader>
                    <AddPaymentForm setDialog={setDialog}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentPage;