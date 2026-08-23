from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import Base, Note, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class NoteIn(BaseModel):
    author: str
    content: str


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/api/notes")
def list_notes():
    db = SessionLocal()
    try:
        return db.query(Note).order_by(Note.id.desc()).all()
    finally:
        db.close()


@app.post("/api/notes")
def create_note(note: NoteIn):
    db = SessionLocal()
    try:
        row = Note(author=note.author, content=note.content)
        db.add(row)
        db.commit()
        db.refresh(row)
        return row
    finally:
        db.close()
