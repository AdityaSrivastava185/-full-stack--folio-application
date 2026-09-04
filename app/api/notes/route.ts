import { ConnectDB } from "@/lib/ConnectDB";
import Note from "@/model/note.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await ConnectDB()
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({
                success : false,
                message : "please sign in to continue",
            } , {
                status : 401
            })
        }
        const allNote = await Note.find({userId : userId})
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