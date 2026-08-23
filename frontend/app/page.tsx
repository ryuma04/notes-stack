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
    <main>
      <h1>Notes Stack</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author</label>{" "}
          <input
            id="author"
            maxLength={50}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>{" "}
          <input
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.author}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
