import { CreditCard, Wallet, Smartphone, type LucideIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FetchPayments } from "@/api/payment/payment.queries";
import { maskCard, maskPhone, maskUpi } from "@/utils/customStyle";
import { Skeleton } from "@/components/ui/skeleton";

type CheckoutPaymentProps = {
    selectedPaymentId: string | null;
    onSelectPayment: (paymentId: string) => void;
};

const CheckoutPaymentMethods = ({ selectedPaymentId, onSelectPayment }: CheckoutPaymentProps) => {

    const { data, isPending, isError } = FetchPayments();

    if (isPending) return <div className="space-y-3"><Skeleton className="w-full h-10 bg-primary-foreground" /><Skeleton className="w-full h-10 bg-primary-foreground" /></div>;
    if (isError) return <>Something went wrong</>;

    return (
        <RadioGroup
            value={selectedPaymentId ?? ""}
            onValueChange={onSelectPayment}
        >
            {data?.payments?.map((payment) => {
                const Icon: LucideIcon = payment.type === "card" ? CreditCard : payment.type === "upi" ? Smartphone : Wallet;
                const label = payment.type === "card" ? maskCard(payment.card_number) : payment.type === "upi" ? maskUpi(payment.upi_id) : maskPhone(payment.phone_number);
                return (
                    <div
                        key={payment.id}
                        className="w-full rounded-xl border p-4 flex items-center gap-4 hover:bg-accent transition cursor-pointer"
                    >
                        <RadioGroupItem
                            value={String(payment.id)}
                            id={String(payment.id)}
                        />
                        <div className="flex items-center gap-2 flex-1">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium capitalize">
                                {payment.type}
                            </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {label}
                        </span>
                    </div>
                );
            })}
        </RadioGroup>
    );
}

export default CheckoutPaymentMethods;
