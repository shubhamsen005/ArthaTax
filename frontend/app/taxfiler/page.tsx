"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [userId] = useState("user123");
  const [showForm, setShowForm] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ✅ Get username from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      const loggedIn = localStorage.getItem("isLoggedIn");

      if (!storedName || loggedIn !== "true") {
        window.location.href = "/";
      } else {
        setName(storedName);
      }
    }
  }, []);

  // ✅ Auto-scroll for chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Logout handler
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  // ✅ Upload file and extract text
  async function handleExtract(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/extract-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setText(data.extracted_text);
    setLoading(false);
  }

  // ✅ Analyze extracted text
  async function handleAnalyze() {
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch("http://localhost:8000/analyze-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setAnalysis(data.analysis);
    setMessages([
      { sender: "ai", text: "✅ **Analysis complete!** You can now chat or upload more documents below." },
      { sender: "ai", text: data.analysis },
    ]);
    setLoading(false);
    setShowForm(false);
  }

  // ✅ Chat handler
  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("message", input);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: data.reply || "🤖 (No response — please try asking a specific tax question!)" },
    ]);
    setLoading(false);
  }

  // ✅ Upload extra document in chat
  async function handleUploadExtra(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/upload-doc", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `📎 Uploaded: ${file.name}` },
      { sender: "ai", text: data.message },
    ]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 flex flex-col items-center px-4 py-10">
      {/* ✅ Header */}
      <header className="flex justify-between w-full max-w-5xl mb-10 items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
          TaxFiler AI Assistant 💼
        </h1>

        <div className="flex items-center gap-4">
          <p className="text-gray-300 text-lg">
            👋 Welcome, <span className="text-blue-400 font-semibold">{name || "User"}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ✅ Tax Form */}
      {showForm && (
        <div className="bg-slate-800/70 p-8 rounded-2xl w-full max-w-3xl shadow-lg border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Let’s Get to Know You</h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Aadhaar " />
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="PAN" />
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !e.target.value && (e.target.type = "text")}
              placeholder="Date of Birth"
              className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-gray-100"
            />
            <select className="p-3 rounded-lg bg-slate-900/70 border border-slate-700">
              <option>Employment Type</option>
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Freelancer</option>
              <option>Retired</option>
            </select>
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Annual Income Range" />
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Other Income Sources?" />
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Tax Saving Investments?" />
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Rent or Home Loan?" />
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Investments (Shares, MF, Crypto)" />
            <select className="p-3 rounded-lg bg-slate-900/70 border border-slate-700">
              <option>Have you filed ITR before?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <input className="p-3 rounded-lg bg-slate-900/70 border border-slate-700" placeholder="Bank Name" />
            <select className="p-3 rounded-lg bg-slate-900/70 border border-slate-700">
              <option>Would you like AI to suggest deductions?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </form>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowForm(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all"
            >
              🚀 Continue to Document Upload
            </button>
          </div>
        </div>
      )}

      {/* ✅ Document Upload + Chat */}
      {!showForm && (
        <>
          {/* Upload Section */}
          {!analysis && (
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg w-full max-w-2xl text-center border border-gray-200 mt-10">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">Upload Your Financial Document</h2>
              <p className="text-gray-600 mb-6">
                Upload <span className="font-medium text-indigo-600">Form 16, bank statements, salary slips</span>, or <br />
                Form 26AS to begin analysis.
              </p>

              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleExtract}
                className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-all"
              />

              {loading && <p className="text-indigo-600 mt-4 font-medium">⏳ Processing your file...</p>}

              {text && (
                <>
                  <h3 className="text-lg mt-6 font-semibold text-gray-800">Extracted Text Preview:</h3>
                  <pre className="bg-gray-100 p-4 mt-3 rounded-lg max-h-64 overflow-y-auto text-left text-sm text-gray-700 whitespace-pre-wrap shadow-inner">
                    {text}
                  </pre>

                  <button
                    onClick={handleAnalyze}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl mt-6 shadow-md transition-all"
                  >
                    Analyze with AI
                  </button>
                </>
              )}
            </div>
          )}

          {/* Chat Section */}
          {analysis && (
            <div className="bg-white/95 p-6 mt-10 rounded-3xl shadow-lg w-full max-w-3xl flex flex-col border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">💬 Chat with Your AI Tax Consultant</h2>

              <div className="flex-1 overflow-y-auto h-[60vh] border rounded-2xl p-4 bg-gray-50 space-y-3 shadow-inner">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        m.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="prose prose-slate max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && <p className="text-center text-indigo-500 italic">✳️ AI is thinking...</p>}
                <div ref={chatEndRef} />
              </div>

              <div className="flex items-center mt-4 gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask a follow-up question..."
                  className="flex-1 border border-indigo-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
                >
                  Send
                </button>
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-3 rounded-xl transition-all text-gray-700">
                  📎
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleUploadExtra}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}







