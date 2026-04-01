import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("Ocorreu um erro:", e);
      }
    };
    fetchCurrentPost();
  }, [id]);
  
  if (!post) return <h2>Loading...</h2>;  //outra opção 'if (loading) return <h2>Loading...</h2>' e 'if (error) return <h2>{error}</h2>'
  //outra opção 'post?.title' abaixo
  //outra opção 'post && post.title' abaixo
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {/* <h2>{post?.title}</h2> */}
      {/* <p>{post?.body}</p> */}
      {/* post && <h2>{post.title}</h2> */}
      {/* post && <p>{post.body}</p> */}
      <Link to="/">Back to Posts</Link>
    </div>
  );
}

export default PostDetails;
