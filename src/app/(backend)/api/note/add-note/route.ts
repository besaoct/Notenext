import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(frontend)/lib/prismadb";
import getCurrentUser from "@/app/(backend)/helpers/getCurrentUser";

export async function POST(request: NextRequest) {
    
try {
const Note = prisma.note
    const requestResult = await request.json();
    const { title, content, isPublic } = requestResult
   
    //let's get the current user id
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: "Please login to add a note" },
        { status: 404 }
      );
    }
    const userId = currentUser.id
    
    
    // Create a new note
    const newNote = await Note.create({
        data: {
            title,
            content,
            isPublic,
            createdBy: {
                connect: {
                    id: userId,
                },
            }
        }
    });

 return NextResponse.json({
      message: "Note created successfully",
      success: true,
      note: newNote,
 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


}


