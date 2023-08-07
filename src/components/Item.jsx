import React from "react";
import { Card, Button } from "react-bootstrap";
import FormatCurrency from "./FormatCurrency";
import {useShoppingCart} from "../context/ShoppingCartContext"
const Item = ({ id, name, price, imgUrl }) => {
const {itemQuantity , increaseQuantity , decreaseQuantity, removeItemCart} = useShoppingCart()

  const quantity = itemQuantity(id);
  return (
    <Card className="h-120">
      <Card.Img
        style={{ height: "200px", objectFit: "cover" }}
        variant="top"
        src={imgUrl}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span>{name}</span>
          <span className="me-2 text-muted">{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={()=>increaseQuantity(id)} variant="success" className="w-100">
              Add to cart
            </Button>
          ) : (
            <div style={{gap:"1.1rem"}} className="d-flex align-items-center flex-column" >
              <div style={{gap:".6rem"}} className="d-flex align-items-center justify-content-center">
                <Button onClick={()=>decreaseQuantity(id)} variant="primary">-</Button>
                <span className="fs-3"> {quantity} In cart</span>
                <Button onClick={()=>increaseQuantity(id)} variant="primary">+</Button>
              </div>onClick={()=>increaseQuantity(id)}
              <Button onClick={()=>removeItemCart(id)} size="sm" variant="danger">Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Item;
