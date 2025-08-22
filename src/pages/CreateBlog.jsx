import { useContext, useState } from "react";
import { Link } from "react-router";
import RobotsContext from "../contexts/RobotsContext";

export default function CreateBlog() {
  const { createPost } = useContext(RobotsContext);
  const [form, setForm] = useState({ title: "", content: "", cover: "" });
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content ) {
      alert("Alle Felder sind erforderlich!");
      return;
    }
    await createPost(form);
    setCreated(true);
  };

  if (created) {
    return (
      <div className="flex flex-col items-center gap-6 mt-10">
        <div className="alert alert-success shadow-lg w-full max-w-md">
          <div>
            <span>Post wurde erfolgreich erstellt!</span>
          </div>
        </div>
        <Link to="/" replace className="btn btn-secondary btn-wide">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">
            Erstellen Sie einen neuen Beitrag über den Roboter
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Titel"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Cover Image URL"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Inhalt"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="textarea textarea-bordered w-full min-h-[120px]"
            />
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                ➕ Erstellen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
