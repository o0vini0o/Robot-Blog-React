import { useParams, useNavigate } from "react-router";
import { useState } from "react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Beispiel-Daten (später aus Context holen)
  const [robot] = useState({
    id: id,
    title: `Roboter #${id} - Advanced AI Unit`,
    image: `https://upload.wikimedia.org/wikipedia/en/c/cb/Marvin_%28HHGG%29.jpg`,
    content: `Dies ist ein hochmoderner Roboter der neuesten Generation. 
Mit fortschrittlicher KI ausgestattet, kann er komplexe Aufgaben autonom erledigen.

Technische Spezifikationen:
• CPU: Quantum Processor 3.0
• RAM: 256GB DDR5
• Sensoren: 360° Lidar, 4K Kameras
• Mobilität: Omnidirektionale Räder
• Akkulaufzeit: 12 Stunden

Dieser Roboter eignet sich perfekt für industrielle Anwendungen und 
kann in verschiedenen Umgebungen eingesetzt werden.`,
  });

  const handleUpdate = () => {
    console.log(`Update Roboter ${id}`);
    // navigate(`/robot/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("Roboter wirklich löschen?")) {
      console.log(`Delete Roboter ${id}`);
      // navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header 
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Details
        </h1>*/}

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl border ">
          <div className="card-body space-y-6">
            {/* Title Section */}
            <div className="card bg-base-200 border ">
              <div className="card-body py-4">
                <h2 className="card-title text-primary justify-center text-xl">
                  {robot.title}
                </h2>
              </div>
            </div>

            {/* Pic & Content Section */}
            <div className="card bg-base-200 border ">
              <div className="card-body">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                  Picture and informations
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="flex justify-center">
                    <figure className="w-full max-w-md">
                      <img
                        src={robot.image}
                        alt={robot.title}
                        className="rounded-xl w-full h-auto object-cover shadow-lg"
                      />
                    </figure>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-base-content leading-relaxed whitespace-pre-line">
                        {robot.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            ← Zurück zur Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
