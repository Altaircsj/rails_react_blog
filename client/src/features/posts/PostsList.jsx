// API_URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("Não conectou com a API");
        console.log("Ocorreu um erro:", e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        //precisa alterar o controller para retornar o post deletado
        //const json = await response.json(); 
        //console.log(json);

        setPosts(posts.filter((post) => post.id !== id));
        //setPosts(prev => prev.filter(post => post.id !== id)) // usando functional update
      } else {
        throw response;
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>Loading...</h2>;
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Deletar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
