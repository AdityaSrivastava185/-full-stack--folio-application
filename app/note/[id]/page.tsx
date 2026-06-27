"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter()
  const { id } = use(params);
  const [savedNoteTitle, setSavedNoteTitle] = useState("");
  const [savedNoteDescription, setSavedNoteDescription] = useState("");
  useEffect(() => {
    const fetchSingleNote = async () => {
      const response = await fetch(`/api/userNote/${id}`);
      const data = await response.json();
      setSavedNoteTitle(data?.savedNote?.title);
      setSavedNoteDescription(data?.savedNote?.description);
    };
    fetchSingleNote();
  }, [id]);

  const handleUpdateNote = async () => {
    const response = await fetch(`/api/userNote/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: savedNoteTitle,
        description: savedNoteDescription,
      }),
    });
    const data = await response.json();
    toast.success(data.message)
    router.push("/notes")
    return;
  };

  const handleNoteDelete = async() => {
    const response = await fetch(`/api/userNote/${id}` , {
      method:"DELETE",
    })
    const data = await response.json()
    console.log(data)
    router.push('/')
    toast.success(data.message)
    return;
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
      <main className="flex flex-col flex-1 rounded-2xl mx-7 mb-7">
        <Navbar onSave={handleUpdateNote} />
        <div className="flex flex-1 flex-col gap-7">
          <input
            type="text"
            value={savedNoteTitle}
            onChange={(e) => setSavedNoteTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-7 bg-transparent outline-none text-3xl font-semibold placeholder:text-muted-foreground/40 tracking-tight mt-7"
          />
          <textarea
            id="text-editor"
            value={savedNoteDescription}
            onChange={(e) => setSavedNoteDescription(e.target.value)}
            placeholder="what's on your mind today!?"
            className="p-7 rounded-xl flex-1 w-full resize-none outline-none text-xl text-muted-foreground"
          />
          <Button className="w-fit cursor-pointer" onClick={handleNoteDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-icon lucide-trash"
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default page;
