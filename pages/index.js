import React from 'react';
import { addScriptTagMutation } from '../queries/queries';
import { graphql } from 'react-apollo';
import { TitleBar } from '@shopify/app-bridge-react';
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";

class Index extends React.Component{
  setScriptTag(e){
    const scriptTagInput = {
      src: 'https://b04186343800.ngrok.io/api/shopify/scripts/testScript', 
      displayScope: 'ONLINE_STORE'
    };
    console.log("script tag gesetzt, input:",scriptTagInput);
    this.props.addScriptTagMutation(
      {variables: { input:scriptTagInput },}
    )
  }
  render(){
    const primaryAction = {content: 'Apply in Store', onAction: this.setScriptTag.bind(this)};
    return (
      <div>
        <TitleBar
          primaryAction={primaryAction}
        />
        {/* <CountdownApp /> */}
      </div>
    );
  }
};

export const getServerSideProps = authenticateShopifyPage();

export default graphql(addScriptTagMutation, {name: "addScriptTagMutation"})(Index);
