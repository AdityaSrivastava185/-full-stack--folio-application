"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSaveNote = async () => {
    const response = await fetch("/api/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const data = await response.json();
    if(response.ok){
      toast.success(data.message , {
        position : "bottom-center",
      })
      setTitle(""),
      setDescription("")
    } else {
      toast.error(data.message , {
        position : "bottom-center"
      })
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
        <Navbar onSave={handleSaveNote}/>
        <main className="flex flex-col flex-1 rounded-2xl my-7">
          <div className="flex flex-1 flex-col px-7 gap-7">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-transparent outline-none text-3xl font-semibold placeholder:text-muted-foreground/40 tracking-tight mt-7 "
            />
            <textarea
              id="text-editor"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="what's on your mind today!?"
              className="flex-1 w-full resize-none outline-none text-xl"
            />
          </div>
        </main>
      </div>
    </>
  );
}
