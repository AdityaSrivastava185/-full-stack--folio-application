import { ConnectDB } from "@/lib/ConnectDB";
import Note from "@/model/note.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface paramsprops {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest , { params } : paramsprops) {
    try{
        const {id} = await params;
        await ConnectDB()
        const savedNote = await Note.findById(id)
        return NextResponse.json({
            success : true,
            message : "Notes fetched successfully",
            savedNote,
        } , {status:201})
    } catch(error){
        return NextResponse.json({
            success : false,
            message : "Error while fetching the note",
        } , {status : 500})
    }

}


export async function PATCH(req :  NextRequest , {params} : paramsprops){
    try{
        await ConnectDB();
        const {userId} = await auth()
        if(!userId) {
            return NextResponse.json({
                success : false,
                message : "Please sign in to continue"
            } , {
                status : 401
            })
        }
        const {id} = await params;
        const body = await req.json();
        const {title , description} = await body;
        const updateNote = await Note.findByIdAndUpdate({_id : id , userId : userId} , {title , description} , {new:true});
        return NextResponse.json({
            success:true,
            message:"Note has been updated successfully",
            updateNote
        } , {status : 200})
    } catch (error){
        NextResponse.json({
            success:false,
            message:"Error while updating the note"
        },{status : 500})
    }
}


export async function DELETE(req : NextRequest , {params} : paramsprops){
    try{
        await ConnectDB();
        const {userId} = await auth();
        if(!userId) {
            return NextResponse.json({
                success : false,
                message : "Please sign in to continue"
            } , {
                status : 401
            })
        }
        const {id} = await params;
        const deleteNote = await Note.findByIdAndDelete({
            _id : id,
            userId : userId
        });
        return NextResponse.json({
            success:true,
            message:"Note deleted successfully",
        } , {status:200})
    } catch (error){
        return NextResponse.json({
            success:false,
            message:"Error deleting the user note"
        },{status:500})
    }
}