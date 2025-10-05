import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [surveys, setSurveys] = useState([]);

  // új felmérés létrehozása
  const createSurvey = async () => {
    const res = await fetch("http://localhost:5000/create-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, question }),
    });
    const data = await res.json();
    alert(data.message);
    fetchSurveys();
  };

  // felmérések lekérése
  const fetchSurveys = async () => {
    const res = await fetch("http://localhost:5000/surveys");
    const data = await res.json();
    setSurveys(data);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className="App" >

      <div className="Header">
        <h1>Polls & Survey Builder</h1>
      </div>
      <div className="Content">
        <h3>Új felmérés</h3>
        <input
        className="inputField"
        type="text"
        placeholder="Cím"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <input
        className="inputField"
        type="text"
        placeholder="Kérdés"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        />
        <div>
        <button className="sendButton" onClick={createSurvey}>
        Felmérés létrehozása
        </button>
        </div>
      </div>
      <div className="Results">
      <h3>Meglévő felmérések</h3>
      <ul>
        {surveys.map((s, i) => (
          <li key={i}>
            <strong>{s.title}</strong>: {s.question}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
