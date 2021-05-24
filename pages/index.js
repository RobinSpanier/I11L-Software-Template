import React from 'react';
import { addScriptTagMutation } from '../queries/queries';
import { graphql } from 'react-apollo';
import { TitleBar } from '@shopify/app-bridge-react';
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";

class Index extends React.Component{
  setScriptTags(e){
    this.applyCountdownAppToWebfront(e);
    this.applyConfigurationToWebfront(e);

  }
  applyConfigurationToWebfront(e){
    const scriptTagInput = {
      src: 'https://firestore.googleapis.com/v1/projects/i11l-software/databases/(default)/documents/Countdown-Configuration/tAoYnDTBXG1uS58959Z1', 
      displayScope: 'ONLINE_STORE'
    };
    console.log("configuration link for user set ",scriptTagInput);
    this.props.addScriptTagMutation(
      {variables: { input:scriptTagInput },}
    )
  }
  applyCountdownAppToWebfront(e){
    const scriptTagInput = {
      src: 'https://cdn.jsdelivr.net/gh/RobinSpanier/Scripts@main/I11L-Shopify-Countdown-App.js', 
      displayScope: 'ONLINE_STORE'
    };
    console.log("countdown link set: ",scriptTagInput);
    this.props.addScriptTagMutation(
      {variables: { input:scriptTagInput },}
    )
  }
  render(){
    const primaryAction = {content: 'Apply in Store', onAction: this.setScriptTags.bind(this)};
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
