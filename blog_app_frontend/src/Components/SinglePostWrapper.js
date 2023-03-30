import { useParams } from 'react-router-dom';
import SinglePost from "./SinglePost";

const SinglePostWrapper = () => {
    const { postUrl } = useParams();
  
    return <SinglePost postUrl={postUrl}/>
  }

export default SinglePostWrapper