import React from "react";
import { Button } from "./ui/button";

interface buttonProp {
  onSave : () => void
}

const Navbar = ({ onSave }: buttonProp) => {
  return (
    <div>
      <nav className="flex flex-col items-start shrink-0">
        <div className="px-7 pt-4 w-full flex flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center gap-7">
            <h1 className="font-semibold text-xl">Folio</h1>
            <h2 className="font-semibold text-xl">About us</h2>
          </div>
          <div>
            <Button
              variant="default"
              onClick={onSave}
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background cursor-pointer"
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
