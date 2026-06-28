import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useNoteStore from "@/store/useNotesStore";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

interface buttonProp {
  onSave: () => void;
}

const Navbar = ({ onSave }: buttonProp) => {
  const lengthOfNotes = useNoteStore((state) => state.notes.length);
  // console.log(lengthOfNotes);
  return (
    <div>
      <nav className="flex flex-col items-start shrink-0">
        <div className="px-7 pt-4 w-full flex flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center gap-7">
            <Link href={"/"} className="font-semibold text-xl">
              Folio
            </Link>
            <Link href={"/about"} className="font-semibold text-xl">
              About us
            </Link>
          </div>
          <div className="flex gap-7">
             <Show when="signed-out">
              <SignInButton>
                <Button className="rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
            </Show>
             <Show when="signed-in">
              <UserButton />
            </Show>
            {lengthOfNotes > 0 && (
              <Link
                href={"/notes"}
                className="rounded-md bg-secondary hover:bg-secondary/90 px-4 py-2 text-sm font-medium text-foreground cursor-pointer"
              >
                All Notes
              </Link>
            )}
            <Button
              variant="secondary"
              onClick={onSave}
              className="rounded-md px-4 py-2 text-sm font-medium cursor-pointer"
            >
              Save
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
