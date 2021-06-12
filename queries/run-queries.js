import { useQuery } from "@apollo/react-hooks";
import { useEffect } from "react";
import { retrieveScriptTags } from "./queries";

const RunQueries = (props) => {
  const scriptTags = useQuery(retrieveScriptTags)
  console.log(scriptTags);

  const getScriptTags = () => {
    props.onChangeValue({scriptTags: scriptTags});
  }

  useEffect(() => {
    getScriptTags();
  }, []);

  return(
    <div></div>
  )

}
 
export default RunQueries;