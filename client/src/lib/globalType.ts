export type SuccessResponse = {
    message: string
};

export type ErrorResponse = {
    message: string
    error?: any
}

export const Role = ["admin", "manager", "member"] as const;
export type role = typeof Role[number];