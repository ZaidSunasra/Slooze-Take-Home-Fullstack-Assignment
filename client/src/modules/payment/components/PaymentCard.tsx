import type { Payment } from "@/api/payment/payment.type";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCardNumber } from "@/utils/customStyle";
import { CreditCard, Pencil, Smartphone, Wallet, type LucideIcon } from "lucide-react";
import { useState } from "react";
import EditPaymentForm from "./EditPaymentForm";

const PaymentCard = ({ payment }: { payment: Payment }) => {

    const [dialog, setDialog] = useState<boolean>(false);

    const renderDetails = () => {
        switch (payment.type) {
            case "card":
                return (
                    <>
                        <p className="text-sm text-muted-foreground">Card Number</p>
                        <p className="font-medium"> {formatCardNumber(payment.card_number)}</p>
                        <p className="text-sm text-muted-foreground mt-2">Expiry</p>
                        <p className="font-medium">
                            {payment.expiry_date}/{payment.expiry_year}
                        </p>
                    </>
                );

            case "upi":
                return (
                    <>
                        <p className="text-sm text-muted-foreground">UPI ID</p>
                        <p className="font-medium">{payment.upi_id}</p>
                    </>
                );

            case "wallet":
                return (
                    <>
                        <p className="text-sm text-muted-foreground">Wallet Number</p>
                        <p className="font-medium">{payment.phone_number}</p>
                    </>
                );
        }
    };

    const Icon: LucideIcon = payment.type === "card" ? CreditCard : payment.type === "upi" ? Smartphone: Wallet;

    return (
        <div className="rounded-xl border bg-background p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold capitalize">{payment.type} Payment</h3>
                </div>
                <div>
                    <Button variant="outline" onClick={() => setDialog(true)}>
                        <Pencil className="text-green-500" />
                    </Button>
                </div>
            </div>
            <div className="space-y-1">
                {renderDetails()}
            </div>
            <Dialog open={dialog} onOpenChange={setDialog} >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-106.25 bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit Payment</DialogTitle>
                        <DialogDescription>Edit details to existing payment methods.</DialogDescription>
                    </DialogHeader>
                    <EditPaymentForm setDialog={setDialog} data={payment} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentCard;