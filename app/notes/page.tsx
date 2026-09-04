"use client";

import Navbar from "@/components/Navbar";
import useNoteStore from "@/store/useNotesStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface AllNoteProps {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<AllNoteProps[]>([]);
  const AllNotesInStore = useNoteStore((state) => state.setNotes);
  const NoteLength = useNoteStore((state) => state.notes.length)

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data.allNote);
      AllNotesInStore(data.allNote);

    };
    getNotes();
  }, [setNotes , AllNotesInStore]);

  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="min-h-screen w-full px-16 py-4 text-foreground">
        <Navbar onSave={() => {}} />
          <div className="pr-7 my-7">
            {
              NoteLength === 0 ? <></> : NoteLength === 1 ? <p className="text-right">{NoteLength} Note</p> : <p className="text-right">{NoteLength} Notes</p>
            }
          </div>
        <main className="grid max-w-5xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 mt-7">
          {notes.map((note) => {
            return (
                <Link
                  href={note?._id ? `/note/${note._id}` : "/notes"}
                  key={note._id}
                  className="group block overflow-hidden rounded-[23px] border border-border bg-secondary/30 transition duration-200 hover:-translate-y-1 hover:border-ring/50"
                >
                  <div className="flex min-h-56 flex-col px-8 pb-9 pt-8">
                    <h2 className="max-w-64 text-[21px] font-semibold leading-[1.08]">
                      {note.title}
                    </h2>
                    <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {new Date(note.createdAt).toLocaleDateString("en-us", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default NotesPage;
