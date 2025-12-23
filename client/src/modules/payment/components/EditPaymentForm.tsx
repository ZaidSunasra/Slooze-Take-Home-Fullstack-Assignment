import type { Payment } from '@/api/payment/payment.type';
import { type Dispatch, type SetStateAction } from 'react'
import { addPaymentSchema, Payment_Mode, type AddPayment } from "@/api/payment/payment.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditPayment } from "@/api/payment/payment.mutation";

const EditPaymentForm = ({ setDialog, data }: { setDialog: Dispatch<SetStateAction<boolean>>, data: Payment }) => {

  const editPayment = useEditPayment();
  const payment_id = data.id

  const form = useForm<AddPayment>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: {
      type: data.type,
      expiry_date: data.expiry_date ?? "",
      expiry_year: data.expiry_year ?? "",
      card_number: data.card_number ?? "",
      upi_id: data.upi_id ?? "",
      phone_number: data.phone_number ?? ""
    }
  });

  const onSubmit = (data: AddPayment) => {
    editPayment.mutate({ data, id: String(payment_id) }, {
      onSuccess: () => setDialog(false),
    });
    form.reset();
  }

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2 col-span-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type*</FormLabel>
                <Select onValueChange={(val) => field.onChange(val)} value={field.value ?? ""}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Payment_Mode.map((mode: string, index: number) => (
                      <SelectItem key={index} value={mode} className="uppercase">
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch("type") === "card" &&
          <>
            <div className="space-y-2 col-span-4">
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel>Card Number*</FormLabel>
                      <FormControl>
                        <Input id="card_number" inputMode="numeric" placeholder="Enter card number" {...field} value={field.value ?? ""} maxLength={16} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel>Expiry Month*</FormLabel>
                      <FormControl>
                        <Input id="expiry_date" type="number" placeholder="Enter expiry month" {...field} value={field.value ?? ""} min={1} max={12} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <FormField
                control={form.control}
                name="expiry_year"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel>Expiry year*</FormLabel>
                      <FormControl>
                        <Input id="expiry_year" type="number" placeholder="Enter expiry year" {...field} value={field.value ?? ""} min={25} max={99} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        }
        {form.watch("type") === "upi" &&
          <div className="space-y-2 col-span-4">
            <FormField
              control={form.control}
              name="upi_id"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel>UPI ID*</FormLabel>
                    <FormControl>
                      <Input id="upi_id" placeholder="Enter UPI id" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        }
        {form.watch("type") === "wallet" &&
          <div className="space-y-2 col-span-4">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                      <Input id="phone_number" inputMode="numeric" placeholder="Enter phone number" {...field} value={field.value ?? ""} maxLength={10} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        }
        <div className="flex justify-between">
          <Button type="submit" disabled={editPayment.isPending}>
            Save Payment
          </Button>
        </div>
      </div>
    </form>
  </Form>
)
}

export default EditPaymentForm;