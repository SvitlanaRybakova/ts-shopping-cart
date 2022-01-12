import React, { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
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
  console.log(data);
  return (
    <>
      <Drawer>Drawer</Drawer>
      {/* <LinearProgress /> */}
      start
    </>
  );
}

export default App;
