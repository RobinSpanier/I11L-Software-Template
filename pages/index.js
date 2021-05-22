import React from "react";
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";

const Index = () => {
  return (
    <div>I11L Countdown App</div>
  );
};

export const getServerSideProps = authenticateShopifyPage();

export default Index;
