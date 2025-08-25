import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import useRobots from "../hooks/useRobots";
import YoutubeEmbed from "../components/YoutobeEmbed";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Context-Funktionen
  const { robots, fetchPostById, deletePost, isLoading } = useRobots();

  // Lokaler State für den einzelnen Roboter
  const [robot, setRobot] = useState(null);
  const [loadingRobot, setLoadingRobot] = useState(true);

  // Roboter beim Laden der Seite abrufen
  useEffect(() => {
    const loadRobot = async () => {
      setLoadingRobot(true);
      try {
        // Erst schauen ob Roboter schon im Context ist
        const existingRobot = robots.find((r) => r.id === parseInt(id));

        if (existingRobot) {
          setRobot(existingRobot);
        } else {
          // Wenn nicht, von der API holen
          const fetchedRobot = await fetchPostById(id);
          setRobot(fetchedRobot);
        }
      } catch (error) {
        console.error("Fehler beim Laden des Roboters:", error);
        alert("Roboter konnte nicht gefunden werden!");
        navigate("/");
      } finally {
        setLoadingRobot(false);
      }
    };

    if (id) {
      loadRobot();
    }
  }, [id]); // Nur neu laden wenn sich die ID ändert

  const handleUpdate = () => {
    console.log(`Update Roboter ${id}`);
    navigate(`/robots/${id}/edit`); // ← Zur Edit-Seite navigieren
  };

  const handleDelete = async () => {
    if (window.confirm("Roboter wirklich löschen?")) {
      try {
        await deletePost(parseInt(id)); // ← Context-Funktion nutzen
        alert("Roboter wurde gelöscht!");
        navigate("/"); // Nach Löschen zur Homepage
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
        alert("Roboter konnte nicht gelöscht werden!");
      }
    }
  };

  // Loading-Anzeige
  if (loadingRobot || isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Roboter wird geladen...</p>
        </div>
      </div>
    );
  }

  // Fehler wenn kein Roboter gefunden
  if (!robot) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Roboter nicht gefunden!
          </h2>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Zurück zur Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl border">
          <div className="card-body space-y-6">
            {/* Title Section */}
            <div className="card bg-base-200 border">
              <div className="card-body py-4">
                <h2 className="card-title text-secondary justify-center text-xl">
                  {robot.title}
                </h2>
              </div>
            </div>

            {/* Pic & Content Section */}
            <div className="card bg-base-200 border">
              <div className="card-body">
                <h3 className="text-2xl font-bold text-secondary mb-6 text-center">
                  Picture and informations
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="flex justify-center">
                    <figure className="w-full max-w-md">
                      <img
                        src={robot.cover || robot.image} // ← 'cover' aus DB
                        alt={robot.title}
                        className="rounded-xl w-full h-auto object-cover shadow-lg"
                        onError={(e) => {
                          // Fallback-Bild bei Fehler
                          e.target.src =
                            "https://upload.wikimedia.org/wikipedia/en/c/cb/Marvin_%28HHGG%29.jpg";
                        }}
                      />
                    </figure>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-base-content leading-relaxed whitespace-pre-line">
                        {robot.content}
                      </p>

                      {/* Zusätzliche Infos */}
                      <div className="mt-6 text-sm opacity-70 space-y-1">
                        <p>
                          <span className="font-semibold">author:</span>{" "}
                          {robot.author || "Mr.Place.Holder"}
                        </p>
                        <p>
                          <span className="font-semibold">Created:</span>{" "}
                          {robot.createdAt
                            ? new Date(robot.createdAt).toLocaleDateString(
                                "de-DE",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Datum unbekannt"}
                        </p>
                        <p>
                          <span className="font-semibold">Updated:</span>{" "}
                          {robot.updatedAt
                            ? new Date(robot.updatedAt).toLocaleDateString(
                                "de-DE",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Datum unbekannt"}
                        </p>
                        <p>
                          <span className="font-semibold">ID:</span> #{robot.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {robot.youtubeURL && <YoutubeEmbed url={robot.youtubeURL} />}
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-between pt-4">
              <button
                onClick={handleUpdate}
                className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
              >
                update
              </button>

              <button
                onClick={handleDelete}
                className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
              >
                delete
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
          >
            ← Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
