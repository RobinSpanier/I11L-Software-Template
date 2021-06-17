import { useQuery } from "@apollo/react-hooks";
import { useEffect } from "react";
import { retrieveScriptTags } from "./queries";

const RunQueries = (props) => {
  const scriptTags = useQuery(retrieveScriptTags)

  const getScriptTags = () => {
    props.onChangeValue({scriptTags: scriptTags});
  }

  useEffect(() => {
    setTimeout(() => {
      getScriptTags(); // lazy solution, because i can
    }, 300);
    
  }, []);

  return(
    <div></div>
  )

}
 
export default RunQueries;