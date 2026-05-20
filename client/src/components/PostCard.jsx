import { useEffect, useState } from "react";

import API from "../api/axios";

function PostCard({ post }) {

  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [showComments, setShowComments] = useState(false);

 const handleLike = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // Not logged in
    if (!user) {

      alert("Please login first");

      return;
    }

    await API.put(
      `/posts/like/${post._id}`,
      {
        userId: user.id
      }
    );

    fetchComments();

    window.location.reload();

  } catch (error) {

    alert(
      error.response?.data?.message
    );

    console.log(error);
  }
};

  // FETCH COMMENTS
  const fetchComments = async () => {

    try {

      const res = await API.get(
        `/comments/${post._id}`
      );

      setComments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchComments();

  }, []);

  // ADD COMMENT
  const handleComment = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        `/comments/${post._id}`,
        {
          userId: user.id,
          text
        }
      );

      setText("");

      fetchComments();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="bg-zinc-900 p-4 md:p-6 rounded-2xl mb-5">

      {/* Title */}
      <h2 className="text-2xl font-bold">
        {post.title}
      </h2>

      {/* Story */}
      <p className="mt-4 text-gray-300 break-words">
        {post.story}
      </p>

      {/* Lesson */}
      <p className="mt-4 text-purple-400">
        Lesson: {post.lesson}
      </p>

      {/* Username */}
      <p className="mt-4 text-sm text-gray-500">
        Posted by: {post.userId?.username}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-5">

        {/* Like */}
        <button
          onClick={handleLike}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          ❤️ { Array.isArray(post.likes)
    ? post.likes.length
    : post.likes}
        </button>

        {/* Comment Toggle */}
        <button
          onClick={() =>
            setShowComments(!showComments)
          }
          className="bg-zinc-700 px-4 py-2 rounded hover:bg-zinc-600 transition"
        >
          💬 Comments
        </button>

      </div>

      {/* COMMENTS SECTION */}
      {
        showComments && (

          <div className="mt-5">

            {/* Add Comment */}
            <div className="flex flex-col md:flex-row gap-3">

              <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) =>
                  setText(e.target.value)
                }
                className="flex-1 p-3 rounded bg-black text-white"
              />

              <button
                onClick={handleComment}
                className="bg-purple-600 px-5 py-3 rounded"
              >
                Add
              </button>

            </div>

            {/* Comment List */}
            <div className="mt-5 flex flex-col gap-3">

              {
                comments.map((comment) => (

                  <div
                    key={comment._id}
                    className="bg-black p-3 rounded"
                  >

                    <p className="text-purple-400 text-sm">
                      {comment.userId?.username}
                    </p>

                    <p className="text-gray-300">
                      {comment.text}
                    </p>

                  </div>

                ))
              }

            </div>

          </div>

        )
      }

    </div>
  );
}

export default PostCard;    