import React from "react";
import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/storeItems.json";
import FormatCurrency from "./FormatCurrency";
import useShoppingCart from "../context/ShoppingCartContext";

const CartItem = ({ id, quantity }) => {
  const { removeItemCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) {
    return null;
  }
  return (
    <Stack
      direction="horizontal"
      className={"d-flex align-items-center justify-content-between bg-light"}
      gap={3}
    >
      <img
        src={item.imgUrl}
        alt="cart-img"
        style={{ width: "120px", height: "80px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className="p-2 ms-auto">
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "70px" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "80px" }}>
          {FormatCurrency(item.price)}
        </div>
      </div>
      <div> {FormatCurrency(item.price * quantity)} </div>
      <Button
        onClick={() => removeItemCart(id)}
        size="md"
        variant="outline-danger"
      >&times;
      </Button>
    </Stack>
  );
};

export default CartItem;
