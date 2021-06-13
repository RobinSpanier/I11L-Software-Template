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

const retrieveScriptTags = gql`
 query {
  scriptTags(first:100) {
    edges {
      node {
        id
      }
    }
  }
}

`

const deleteScriptTag = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }`;

export {addScriptTagMutation, retrieveScriptTags, deleteScriptTag};