import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

import PostCard from "../components/PostCard";

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    fetchPosts();

  }, []);

  const fetchPosts = async () => {

    try {

      const res = await API.get("/posts");

      setPosts(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">
      <Navbar />
      <h1 className="text-5xl font-bold mb-10">
        SinkedIn
      </h1>

      {
        posts.map((post) => (

          <PostCard
            key={post._id}
            post={post}
          />

        ))
      }

    </div>
  );
}

export default Home;