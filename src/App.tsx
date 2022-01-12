import React, { useState } from "react";
import { useQuery } from "react-query";
// components
import Item from "./components/Item/Item";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// styles
import { Wrapper, StyledButton } from "./App.styles";
// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]):number => {
    return items.reduce((acc: number, item) => acc + item.amount, 0)
  };
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Somethig went wrong...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
