
import prisma from "../../lib/prismadb";
import { getUserNameByCreatedById } from "./getUserNameByCreatedById";

// Helper function to generate a slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
    .substring(0, 50); // Limit the slug to a reasonable length
}



export async function getPublicNotes(): Promise<Meta[] | undefined> {
  try {
 
    const notes = await prisma.note.findMany({
      where: {
        isPublic: true, // Use the appropriate field for the relationship
      }
    });

   
    const safeNotes = await Promise.all(
      notes.map(async (note) => ({
          ...note,
          createdAt: note.createdAt.toString(),
          slug: generateSlug(note.title),
          author: await getUserNameByCreatedById(note.createdById)
      }))
    );
      
    return safeNotes.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)

  } catch (error: any) {
    throw new Error(error);
  }
}





export async function getPublicNoteById(noteId: string): Promise<NoteType| undefined>  {

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
        isPublic:true
      }
    });
  
    if (!note) {
    return undefined
    }
  
    const author = await getUserNameByCreatedById(note.createdById)

  const NotesObj: NoteType = {
      meta: {
      author,
      slug: generateSlug(note.title),
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      isPublic: note.isPublic,
    
    },
  }

  return NotesObj
}