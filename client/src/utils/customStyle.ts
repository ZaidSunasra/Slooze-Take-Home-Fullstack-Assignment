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

export const maskCard = (card?: string | null) =>
  card ? `**** **** **** ${card.slice(-4)}` : "";

export const maskPhone = (phone?: string | null) =>
  phone ? `+91 ******${phone.slice(-4)}` : "";

export const maskUpi = (upi?: string | null) =>
  upi ? `${upi.slice(0, 2)}***@${upi.split("@")[1]}` : "";
