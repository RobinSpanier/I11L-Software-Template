import {gql} from 'apollo-boost'

const addScriptTagMutation = gql`
  mutation scriptTagCreate($input: ScriptTagInput!){
      scriptTagCreate(input: $input) {
        scriptTag {
          id
        }
        userErrors {
          field
          message
        }
      }
  }`;

export {addScriptTagMutation};