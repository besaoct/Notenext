
import prisma from "../../(frontend)/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { getUserNameByCreatedById } from "./getUserNameByCreatedById";

// Helper function to generate a slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
    .substring(0, 50); // Limit the slug to a reasonable length
}


export async function getCurrentUserNotes(): Promise<Meta[] | undefined> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const notes = await prisma.note.findMany({
      where: {
        createdById: currentUser.id, // Use the appropriate field for the relationship
      }
    });

    const safeNotes= await Promise.all(
      notes.map(async (note) => ({
          ...note,
          createdAt: note.createdAt.toString(),
          slug: generateSlug(note.title),
          author: await getUserNameByCreatedById(note.createdById)
      }))
    );

    return safeNotes.sort((b, a) => a.createdAt < b.createdAt ? 1 : -1)

  } catch (error: any) {
    throw new Error(error);
  }
}


export async function getNoteById(noteId: string): Promise<NoteType| undefined>  {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return undefined;
    }

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
        createdById: currentUser.id,
      }
    });
  
    if (!note) {
    return undefined
    }
  
   const author=await getUserNameByCreatedById(note.createdById)
  const NotesObj: NoteType = {
    meta: {
      slug: generateSlug(note.title),
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      isPublic: note.isPublic,
      author
    },
  }

  return NotesObj
}