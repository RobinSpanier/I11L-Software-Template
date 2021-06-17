import React, {useState, useEffect} from 'react';
import { addScriptTagMutation, deleteScriptTag } from '../queries/queries';
import { graphql } from 'react-apollo';
import { TitleBar } from '@shopify/app-bridge-react';
import firebase from "../public/firebase";



import { Frame, Toast } from '@shopify/polaris';

import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";
import CountdownApp from './countdownApp';
import RunQueries from '../queries/run-queries';
import { flowRight } from 'lodash';


class Index extends React.Component{

  constructor(props){
    super(props);
    this.state = {activeSaveAndApplyToas: false,activeRemoveFromStoreToast: false, countdownIsActive: false, isTouched: false, scriptTags: []};
    
  }
  
  scriptTagSet = false;

  config = {
    endTime: new Date().getTime()+1000*60*30,
    startTime: new Date().getTime(),
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
    backgroundColor: "red",
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
    countdownIsActive: false
  }
  

  

  

  setScriptTag(e){
    const scriptTagInput = {
      src: 'https://cdn.jsdelivr.net/gh/RobinSpanier/Scripts@main/I11L-Shopify-Countdown-App-v13.js', 
      displayScope: 'ONLINE_STORE'
    };

    this.props.addScriptTagMutation(
      {variables: { input:scriptTagInput },}
    )
    this.scriptTagSet = true;
  }



  saveConfiguration(e){
    let configurationsRef = firebase.firestore().collection("Countdown-Configuration").doc(this.props.shopOrigin);
    this.config["countdownIsActive"] = true;
    configurationsRef.set(this.config).then(
      () => this.setState({countdownIsActive: true, isTouched: false})
    )
    this.showSaveAndApplyToast();
  }

  removeFromStore(e){
    let configurationsRef = firebase.firestore().collection("Countdown-Configuration").doc(this.props.shopOrigin);
    this.config["countdownIsActive"] = false;
    configurationsRef.set(this.config).then(
      () => this.setState({countdownIsActive: false, isTouched: false})
    )
    this.showRemoveFromStoreToast();
  }


  handleChangeValue = e => {
    console.log("new config arrived",e.config);
    this.config = e.config;
    this.setState({isTouched: e.isTouched});
  };

  handleScriptTagChangeValue = e => {
    this.setState({scriptTags: e});
    console.log(e);
    if(e.scriptTags.data){
      if(e.scriptTags.data.scriptTags.edges.length > 0 || this.scriptTagSet){
        console.log("ST existent");
      }else{
        this.setScriptTag();
        console.log("ST sets");
      }
    }
  }

  removeAllScriptTagsFromPreviousSessionIfApply(){

    try {
      const scriptTags = this.state.scriptTags.scriptTags.data.scriptTags.edges;
      if(scriptTags.length > 0){
        let firstId = scriptTags[0].node.id;
        this.props.deleteScriptTag({ id:firstId })

      }
    } catch (error) {

    }
    
  }


  hideSaveAndApplyToast = () => {
    this.setState({activeSaveAndApplyToas: false});
  }
  showSaveAndApplyToast = () => {
    this.setState({activeSaveAndApplyToas: true});
  }
  hideRemoveFromStoreToast = () => {
    this.setState({activeRemoveFromStoreToast: false});
  }
  showRemoveFromStoreToast = () => {
    this.setState({activeRemoveFromStoreToast: true});
  }



  render(){

    const primaryAction = {content: 'Save and Apply', onAction: this.saveConfiguration.bind(this)};
    const secondaryActions = [{content: 'Remove from Store', onAction: this.removeFromStore.bind(this), destructive: true}];

    return (
      <Frame>     
        <RunQueries onChangeValue={this.handleScriptTagChangeValue}/>
        <TitleBar
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
        />

        <CountdownApp 
          configuration={this.config}
          shopOrigin={this.props.shopOrigin}
          onChangeValue={this.handleChangeValue}
          countdownIsActive={this.state.countdownIsActive}
          isTouchedCallback={this.state.isTouched}
        />
        {this.state.activeSaveAndApplyToas ? (
          <Toast content="Countdown Created and Deployed" onDismiss={this.hideSaveAndApplyToast}/>
        ) : null}
        {this.state.activeRemoveFromStoreToast ? (
          <Toast content="Countdown Removed from Store" onDismiss={this.hideRemoveFromStoreToast}/>
        ) : null}
        
      </Frame>
    );
  }
};

export const getServerSideProps = authenticateShopifyPage();

export default 
  flowRight(
    graphql(addScriptTagMutation, {name: "addScriptTagMutation"}),
    graphql(deleteScriptTag, {name: "deleteScriptTag"})
  )(Index);
