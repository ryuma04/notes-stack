"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Note = {
  id: number;
  author: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  async function loadNotes() {
    const res = await fetch(`${API_URL}/api/notes`);
    setNotes(await res.json());
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content }),
    });
    setAuthor("");
    setContent("");
    loadNotes();
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Notes Stack</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="author" className="text-sm font-medium">
            Author
          </label>
          <input
            id="author"
            maxLength={50}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <input
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="self-start rounded bg-black px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id} className="rounded border border-gray-200 p-3">
            <strong>{note.author}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
