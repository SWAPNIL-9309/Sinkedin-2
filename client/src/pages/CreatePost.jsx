import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function CreatePost() {

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [lesson, setLesson] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/posts", {
        userId: user.id,
        title,
        story,
        lesson
      });

      alert("Post created");

      setTitle("");
      setStory("");
      setLesson("");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
      <h1 className="text-4xl font-bold mb-8">
        Share Your Story
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded bg-zinc-900"
        />

        <textarea
          placeholder="Your failure story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="p-4 rounded bg-zinc-900 h-40"
        />

        <textarea
          placeholder="Lesson learned"
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
          className="p-4 rounded bg-zinc-900 h-32"
        />

        <button
          className="bg-purple-600 p-4 rounded"
        >
          Post Story
        </button>

      </form>

    </div>
  );
}

export default CreatePost;