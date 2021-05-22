import React from "react";

import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";

import store from 'store-js';


const Index = () => {
  console.log("yo");
  return (
   <div>I work redeploy</div>
  );
};

export const getServerSideProps = authenticateShopifyPage();

export default Index;
