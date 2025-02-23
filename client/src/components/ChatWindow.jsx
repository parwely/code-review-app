import { useState } from "react";

function ChatWindow({ messages }) {
  return (
    <div className="h-64 w-full m-4 p-4 bg-gray-900 text-white rounded-lg overflow-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-2 p-2 rounded ${msg.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
          <strong>{msg.role === "user" ? "Du" : "KI"}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;


