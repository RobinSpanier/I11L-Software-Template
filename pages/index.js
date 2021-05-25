import React from 'react';
import { addScriptTagMutation } from '../queries/queries';
import { graphql } from 'react-apollo';
import { TitleBar } from '@shopify/app-bridge-react';
import firebase from "./firebase";
import {Button} from '@shopify/polaris';
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";

class Index extends React.Component{
  
  
  // getConfigurations(){
  //   this.configurationsRef.onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     })
  //   })
  // }

  addConfiguration(){
    let configurationsRef = firebase.firestore().collection("Countdown-Configuration").doc("i11l-playground-five.myshopify.com");
    let config = {"sizeSchema":2};
    configurationsRef.set(config);

  }

  



  setScriptTag(e){
    const scriptTagInput = {
      src: 'https://cdn.jsdelivr.net/gh/RobinSpanier/Scripts@main/I11L-Shopify-Countdown-App-v6.js', 
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
        <Button onClick={this.addConfiguration}>Safe Configuration</Button>

        {/* <CountdownApp /> */}
      </div>
    );
  }
};

export const getServerSideProps = authenticateShopifyPage();

export default graphql(addScriptTagMutation, {name: "addScriptTagMutation"})(Index);
