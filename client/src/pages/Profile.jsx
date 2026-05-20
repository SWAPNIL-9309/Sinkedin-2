import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [posts, setPosts] = useState([]);

  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {

    fetchUserPosts();

  }, []);

  const fetchUserPosts = async () => {

    try {

      const res = await API.get(
        `/posts/user/${user.id}`
      );

      setPosts(res.data);

      // Calculate total likes
      let likes = 0;

      res.data.forEach((post) => {

        likes += Array.isArray(post.likes)
          ? post.likes.length
          : post.likes;
      });

      setTotalLikes(likes);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto p-5 md:p-10">

        {/* Profile Card */}
        <div className="bg-zinc-900 rounded-3xl p-8">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold">

              {user.username.charAt(0).toUpperCase()}

            </div>

            {/* User Info */}
            <div>

              <h1 className="text-4xl font-bold">
                {user.username}
              </h1>

              <p className="text-gray-400 mt-2">
                {user.email}
              </p>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

            {/* Total Posts */}
            <div className="bg-black rounded-2xl p-6 text-center">

              <h2 className="text-4xl font-bold text-purple-400">

                {posts.length}

              </h2>

              <p className="text-gray-400 mt-2">
                Stories Shared
              </p>

            </div>

            {/* Total Likes */}
            <div className="bg-black rounded-2xl p-6 text-center">

              <h2 className="text-4xl font-bold text-purple-400">

                {totalLikes}

              </h2>

              <p className="text-gray-400 mt-2">
                Total Likes
              </p>

            </div>

            {/* Lessons */}
            <div className="bg-black rounded-2xl p-6 text-center">

              <h2 className="text-4xl font-bold text-purple-400">

                {posts.length}

              </h2>

              <p className="text-gray-400 mt-2">
                Lessons Shared
              </p>

            </div>

          </div>

          {/* User Posts */}
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">

              Your Stories

            </h2>

            <div className="flex flex-col gap-5">

              {
                posts.map((post) => (

                  <div
                    key={post._id}
                    className="bg-black rounded-2xl p-5"
                  >

                    <h3 className="text-2xl font-bold">

                      {post.title}

                    </h3>

                    <p className="text-gray-300 mt-3">

                      {post.story}

                    </p>

                    <p className="text-purple-400 mt-4">

                      Lesson: {post.lesson}

                    </p>

                    <p className="mt-4 text-sm text-gray-500">

                      ❤️ {
                        Array.isArray(post.likes)
                          ? post.likes.length
                          : post.likes
                      }

                    </p>

                  </div>

                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;