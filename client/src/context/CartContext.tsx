import type { CartItem } from "@/api/order/order.type";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type CartContextType = {
    items: CartItem[];
    totalAmount: number;
    countryId: number | null;
    restaurantId: number | null;
    sharedCart: boolean;
    cartId: number | null;
    saveCartId: (id: number) => void;
    enableSharedCart: () => void;
    disableSharedCart: () => void;
    addItem: (item: CartItem, countryId: number, restaurantId: number) => void;
    updateQuantity: (itemId: number, userId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode; }) => {

    const [items, setItems] = useState<CartItem[]>([]);
    const [countryId, setCountryId] = useState<number | null>(null);
    const [restaurantId, setRestaurantId] = useState<number | null>(null);
    const [sharedCart, setSharedCart] = useState<boolean>(false)
    const [cartId, setCartId] = useState<number | null>(null)

    useEffect(() => {
        if (items.length === 0) {
            setRestaurantId(null);
            setCountryId(null);
        }
    }, [items]);

    const totalAmount = useMemo(() =>
        items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const enableSharedCart = () => {
        setSharedCart(true);
    };

    const disableSharedCart = () => {
        setSharedCart(false);
    };

    const saveCartId = (id: number) => {
        setCartId(id)
    }

    const addItem = (newItem: CartItem, newCountryId: number, newRestaurantId: number) => {
        if (restaurantId && restaurantId !== newRestaurantId) {
            toast.error("Cart can contain items from only one restaurant");
            return;
        }
        if (!restaurantId) {
            setRestaurantId(newRestaurantId);
            setCountryId(newCountryId);
        }
        setItems((prev) => {
            const existing = prev.find(
                (item) =>
                    item.item_id === newItem.item_id &&
                    item.user_id === newItem.user_id
            );
            if (existing) {
                return prev.map((item) =>
                    item.item_id === newItem.item_id &&
                        item.user_id === newItem.user_id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }
            return [...prev, newItem];
        });
    };

    const updateQuantity = (itemId: number, userId: number, quantity: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.item_id === itemId &&
                    item.user_id === userId
                    ? { ...item, quantity }
                    : item
            )
        );
    };


    const removeItem = (itemId: number) => {
        setItems((prev) =>
            prev.filter((item) => item.item_id !== itemId)
        );
    };

    const clearCart = () => {
        setItems([]);
        setCountryId(null);
        setRestaurantId(null);
        setSharedCart(false);
        setCartId(null)
    };

    return (
        <CartContext.Provider
            value={{
                items,
                totalAmount,
                countryId,
                restaurantId,
                sharedCart,
                cartId,
                saveCartId,
                enableSharedCart,
                disableSharedCart,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
};
