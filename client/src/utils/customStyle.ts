export const CART_STATUS_BG: Record<string, string> = {
  placed: "bg-green-100 text-green-800",
  draft: "bg-orange-100 text-orange-800",
  cancelled: "bg-red-100 text-red-800"
};

export const formatCardNumber = (cardNumber?: string | null) => {
  if (!cardNumber) return "";
  return cardNumber
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};