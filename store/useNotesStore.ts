import { create } from "zustand"

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface NoteStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
}))

export default useNoteStore