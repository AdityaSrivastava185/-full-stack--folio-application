import { ConnectDB } from "@/lib/ConnectDB";
import Note from "@/model/note.model";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await ConnectDB()
        const allNote = await Note.find({userId : 'temp-user-id'})
        return NextResponse.json({
            success : true,
            message : "All notes fetched successully",
            allNote
        } , {status:200})
    } catch (error){
        return NextResponse.json({
            success : false,
            message : "Error while fetching all the note",
        } , {status : 500})
    }
}