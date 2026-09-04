"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCompletion } from "@ai-sdk/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [savedNoteTitle, setSavedNoteTitle] = useState("");
  const [savedNoteDescription, setSavedNoteDescription] = useState("");
  const [isSummarySheetOpen, setIsSummarySheetOpen] = useState(false);
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
    toast.success(data.message);
    router.push("/notes");
    return;
  };

  const handleNoteDelete = async () => {
    const response = await fetch(`/api/userNote/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
    toast.success(data.message);
    return;
  };

  const { complete, isLoading, error, completion } = useCompletion({
    api: "/api/generate-summary",
  });

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
          <div className="flex items-center gap-3">
            <Button
              className="w-fit cursor-pointer bg-transparent"
              onClick={handleNoteDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
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
            <Button
              className="w-fit cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                if (!savedNoteDescription) {
                  toast.error(
                    "Please provide the content to summarise, try saving a note before summarising with ai",
                  );
                  return;
                }
                setIsSummarySheetOpen(true);
                await complete(savedNoteDescription);
              }}
            >
              {isLoading ? "Summarising..." : "Summarise with AI"}
            </Button>
          </div>
        </div>
      </main>
      {isSummarySheetOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-sm">
          <aside className="flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-7 py-4">
              <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer rounded-md"
                onClick={() => setIsSummarySheetOpen(false)}
                aria-label="Close summary"
              >
                <X />
              </Button>
            </div>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-7">
              <p className="text-sm font-medium text-muted-foreground">
                Saved note description
              </p>
              {error && <div className="text-red-700">{error.message}</div>}
              {completion && (
                <div className="min-h-fit rounded-xl border border-border bg-secondary/30 p-5 text-base leading-7 text-foreground">
                  {completion}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default page;
