import { ConnectDB } from "@/lib/ConnectDB";
import Note from "@/model/note.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // connect to db 
    await ConnectDB()

    // get the data user sent 
    const body = await req.json();
    const {title , description} = body;

    // check that all the data values are given
    if(!title){
        return NextResponse.json({
            success : false,
            message : "Please enter the title to save"
        } , {status : 400})
    }
    if(!description){
        return NextResponse.json({
            success : false,
            message : "Please enter the description to save"
        } , {status : 400})
    }
    // save the data to the note model in db
    const note = await Note.create({
        userId : "temp-user-id", // later replace with clerk id
        title,
        description,
    })

    // return the response 
    return NextResponse.json({
        success : true,
        message : "note created and saved successfully",
    } , {status : 200})
  } catch (error) {
    return NextResponse.json({
      success: false,
      message : "Something went wrong while creating and saving note", 
    } , {status : 500});
  }
}
