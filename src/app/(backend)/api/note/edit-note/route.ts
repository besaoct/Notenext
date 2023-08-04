import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(frontend)/lib/prismadb";
import getCurrentUser from "@/app/(backend)/helpers/getCurrentUser";


export async function PUT(request: NextRequest) {
  try {
    const Note = prisma.note;
    const requestResult = await request.json();
    const { title, content, isPublic } = requestResult;
      const id = request.nextUrl.searchParams.get('id')
      if (!id) {
          return NextResponse.json(
        { error: "Note not found." },
        { status: 404 }
      );
      }


    // Let's get the current user id
      const currentUser = await getCurrentUser();
      if (!currentUser) {
      return NextResponse.json(
        { error: "Please login" },
        { status: 404 }
      );
    }
    const userId = currentUser.id;

    // Check if the note exists and is owned by the current user
    const existingNote = await Note.findUnique({ where: { id } });
    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found !" },
        { status: 404 }
      );
    }

    if (existingNote.createdById !== userId) {
      return NextResponse.json(
        { error: "You don't have permission to edit this note." },
        { status: 403 }
      );
    }

    // Update the note
    const updatedNote = await Note.update({
      where: { id },
      data: {
        title,
        content,
        isPublic
      },
    });

    return NextResponse.json({
      message: "Note updated successfully",
      success: true,
      note: updatedNote,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
