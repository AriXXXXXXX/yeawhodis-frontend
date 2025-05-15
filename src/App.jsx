
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/chat", { message });
      setResponse(res.data.response);
      setHistory((prev) => [...prev, { query: message, result: res.data.response }]);
    } catch (err) {
      setResponse("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9] flex flex-col items-center p-6 font-sans">
      <div className="flex flex-col items-center mb-6">
        <img src="/logo_star_eye.png" alt="YOU WANT DIS?" className="h-16 w-16 mb-2" />
        <div className="text-4xl font-extrabold tracking-tight text-cyan-400">YOU WANT DIS?</div>
      </div>

      <div className="w-full max-w-3xl bg-[#161B22] shadow-lg rounded-2xl p-6 space-y-4">
        <div className="text-base">Tell me what you’re lookin' for on Marketplace:</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex: boho bookshelf under $50"
            className="flex-grow p-2 border border-gray-600 rounded-xl text-black"
          />
          <button
            onClick={sendMessage}
            className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-400"
          >
            Send
          </button>
        </div>
        <div className="min-h-[100px]">
          {loading ? (
            <div className="text-gray-400">Thinking...</div>
          ) : response ? (
            <div className="text-green-400 whitespace-pre-line">{response}</div>
          ) : null}
        </div>
        {history.length > 0 && (
          <div className="pt-4 border-t border-gray-600 text-sm text-gray-400">
            <div className="font-semibold mb-2">Search History:</div>
            <ul className="space-y-1">
              {history.map((entry, idx) => (
                <li key={idx}>🔎 {entry.query}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
