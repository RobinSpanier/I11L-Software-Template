import React, {useState, useEffect} from 'react';
import { addScriptTagMutation } from '../queries/queries';
import { graphql } from 'react-apollo';
import { TitleBar } from '@shopify/app-bridge-react';
import firebase from "./firebase";
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";
import CountdownApp from './countdownApp';

class Index extends React.Component{
  
  
  // getConfigurations(){
  //   this.configurationsRef.onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     })
  //   })
  // }
  config = {
    endTime: new Date().getTime()+1000*60*30,
    startTime: Date.now(),
    sizeSchema: "2",
    positionSchema: 0,
    messageText: "a new special offer!",
    buyNowBtnText: "buy now",
    daysText: "days",
    hoursText: "hours",
    minutesText: "minutes",
    secondsText: "seconds",
    messageTextColor: "yellow",
    buyNowBtnTextColor: "red",
    daysCountTextColor: "red",
    hoursCountTextColor: "red",
    minutesCountTextColor: "red",
    secondsCountTextColor: "red",
    daysLabelTextColor: "red",
    hoursLabelTextColor: "red",
    minutesLabelTextColor: "red",
    secondsLabelTextColor: "red",
    backgroundColor: "grey",
    daysBackgroundColor: "yellow",
    hoursBackgroundColor: "yellow",
    minutesBackgroundColor: "yellow",
    secondsBackgroundColor: "yellow",
    buyNowBtnBackgroundColor: "yellow",
    daysBackgroundTemplate: null,
    hoursBackgroundTemplate: null,
    minutesBackgroundTemplate: null,
    secondsBackgroundTemplate: null,
    backgroundTemplate: null,
    buyNowBtnBackgroundTemplate: null,
  }

  setScriptTag(e){
    const scriptTagInput = {
      src: 'https://cdn.jsdelivr.net/gh/RobinSpanier/Scripts@main/I11L-Shopify-Countdown-App-v9.js', 
      displayScope: 'ONLINE_STORE'
    };
    console.log("script tag gesetzt, input:",scriptTagInput);
    this.props.addScriptTagMutation(
      {variables: { input:scriptTagInput },}
    )

    let configurationsRef = firebase.firestore().collection("Countdown-Configuration").doc("i11l-playground-five.myshopify.com");
    configurationsRef.set(this.config);
  }


  handleChangeValue = e => {
    this.config = e;
    // console.log(this.config);
  };
  render(){
   
    
    const primaryAction = {content: 'Apply in Store', onAction: this.setScriptTag.bind(this)};
    return (
      <div>
        <TitleBar
          primaryAction={primaryAction}
        />
        <CountdownApp 
          configuration={this.config}
          onChangeValue={this.handleChangeValue}
        />
      </div>
    );
  }
};

export const getServerSideProps = authenticateShopifyPage();

export default graphql(addScriptTagMutation, {name: "addScriptTagMutation"})(Index);
