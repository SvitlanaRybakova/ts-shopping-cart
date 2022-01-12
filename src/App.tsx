import React, { useState } from "react";
import { useQuery } from "react-query";
// components
import Item from "./components/Item/Item";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// styles
import { Wrapper } from "./App.styles";
// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  anount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
 
  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Somethig went wrong...</div>;
  return (
    <Wrapper >
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
        ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
