import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [lineOptions, setLineOptions] = useState([]);

  useEffect(() => {
    async function fetchLineOptions() {
      const res = await fetch("http://localhost:3001/lines");
      const lines = await res.json();
      setLineOptions(lines);
    }
    fetchLineOptions();
  }, []);

  async function handleAddNewVideo(evt) {
    evt.preventDefault();
    const videoName = evt.target.elements.name.value;
    const selectedLine = evt.target.elements.line.value;
    if (videoName) {
      try {
        await fetch("http://localhost:3001/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: videoName, lineId: selectedLine }),
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  return (
    <div className="App">
      <main>
        <h1>Fake OTT CMS</h1>
        <h2>Add New Video</h2>
        <form onSubmit={handleAddNewVideo}>
          <label>
            Video Name:
            <input type="text" name="name"></input>
          </label>
          <label>
            Line:
            <select name="line">
              {lineOptions.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add Video</button>
        </form>
      </main>
    </div>
  );
}

export default App;
