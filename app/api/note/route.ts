import { ConnectDB } from "@/lib/ConnectDB";
import Note from "@/model/note.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // connect to db
    await ConnectDB();

    // get the data user sent
    const { userId } = await auth();

    // check that userid is present
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to continue",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { title, description } = body;

    // check that userid is present
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in to continue",
        },
        { status: 401 },
      );
    }

    // check that all the data values are given
    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter the title to save",
        },
        { status: 400 },
      );
    }
    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter the description to save",
        },
        { status: 400 },
      );
    }
    // save the data to the note model in db
    const note = await Note.create({
      userId, // clerk user id
      title,
      description,
    });

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "note created and saved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating and saving note",
      },
      { status: 500 },
    );
  }
}
