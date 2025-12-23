export type SuccessResponse = {
    message: string
};

export type ErrorResponse = {
    message: string
    error?: any
}

export const Role = ["admin", "manager", "member"] as const;
export type role = typeof Role[number];

export const Cart_Status = ["draft", "placed", "cancelled"] as const;
export type cart_status = typeof Cart_Status[number];