import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [code, setCode] = useState("// Schreibe deinen Code hier...");
  const [messages, setMessages] = useState([]);

  const handleReview = async () => {
    setMessages([...messages, { role: "user", content: "Code-Review starten..." }]);

    const response = await fetch("http://localhost:5000/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const review = await response.json();

    setMessages([...messages, { role: "assistant", content: JSON.stringify(review, null, 2) }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-4 p-2 rounded bg-gray-800 text-white">KI-Code-Review</h1>
      <CodeEditor onChange={setCode} />
      <button onClick={handleReview} className="mt-4 p-2 bg-gray-900 text-white overflow-auto rounded">Review starten</button>
      <ChatWindow messages={messages} />
    </div>
  );
}

export default App;


