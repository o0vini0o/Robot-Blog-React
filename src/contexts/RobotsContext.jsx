import { createContext, useEffect, useState } from "react";

const RobotsContext = createContext();

export const RobotsContextProvider = ({ children }) => {
  const [robots, setRobots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const API_URL = "http://localhost:3000/robots";

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const data = await res.json();
        setRobots(data.data || []);
      } catch (error) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

  const fetchPostById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Post nicht gefunden");
    const data = await res.json();
    return data.data;
  };

  const createPost = async (post) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const newPost = await res.json();
    setRobots((prev) => [...prev, newPost]); 
    return newPost;
  };

  const updatePost = async (id, post) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const updated = await res.json();
    setRobots((prev) =>
      prev.map((r) => (r.id === id ? updated : r))
    );
    return updated;
  };

  const deletePost = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setRobots((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <RobotsContext.Provider value={{ robots, setRobots, isLoading, err, fetchPosts, fetchPostById, createPost, updatePost, deletePost }}>
      {children}
    </RobotsContext.Provider>
  );
};
export default RobotsContext;
