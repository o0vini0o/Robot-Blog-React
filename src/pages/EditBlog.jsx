import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import RobotsContext from "../contexts/RobotsContext";

export default function EditBlog() {
  const { id } = useParams();
  const { robots, fetchPostById, updatePost } = useContext(RobotsContext);

  const [form, setForm] = useState({ title: "", content: "", cover: "" });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  
    useEffect(() => {
    const loadRobot = async () => {
      setLoading(true);
      try {
        let existing = robots.find((r) => r.id === parseInt(id));
        if (!existing) {
          existing = await fetchPostById(id);
        }
        if (existing) {
          setForm({
            title: existing.title || "",
            content: existing.content || "",
            cover: existing.cover || existing.image || "",
          });
        }
      } catch (err) {
        console.error("Error loading robot:", err);
        alert("Robot not found!");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadRobot();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("All fields must contain values");
      return;
    }
    try {
      await updatePost(parseInt(id), form);
      setSaved(true);
    } catch (err) {
      console.error("Error saving robot:", err);
      alert("Robot could not be updated!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center gap-6 mt-10">
        <div className="alert alert-success shadow-lg w-full max-w-md">
          <div>
            <span>Robot successfully updated</span>
          </div>
        </div>
        <Link
          to={`/robots/${id}`}
          replace
          className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
        >
          Back to Details
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4 text-3xl font-orbitron font-extrabold">
            Edit robot post
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <label className="form-control w-full">
              <span className="label-text font-semibold">Robot Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-semibold">Cover Image URL</span>
              <input
                type="text"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-semibold">Content</span>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="textarea textarea-bordered w-full min-h-[120px]"
              />
            </label>
            <div className="card-actions justify-between">
              <Link
                to={`/robots/${id}`}
                className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
