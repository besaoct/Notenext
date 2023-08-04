
import TruncateText from '../../components/TruncateText'
import { getPublicNoteById, getPublicNotes } from "@/app/(backend)/helpers/getPublicNotes";
import NoteFound from "../../components/NoteFound";
import SingleNote from "../../components/SingleNote";
type Props = {
    params: {
        note: string,
    },

}

//generateStaticParams
export async function generateStaticParams() {
    const notes = await getPublicNotes() //deduped!
    if (!notes) return []
    return notes.map((note) => ({
        noteId: note.id,
        noteSlug: note.slug,
        noteTitle: note.title
    }))
}



//genetate static meta data

export async function generateMetadata({ params: {note} }: Props) {
  const noteResult = await getPublicNoteById(note);
      if (!noteResult) {
        return NoteFound()     
    }
    const {meta} = noteResult
  
    const description = TruncateText(meta.content, 60)
    
    return {
        title: meta.title,
        description: description
    }
}


export default async function Note( { params: { note } } :Props) {
    const noteResult = await getPublicNoteById(note);
      if (!noteResult) {
        return NoteFound()     
    }
    const {meta} = noteResult

    return (
        <SingleNote Title={meta.title} Content={meta.content} backLink={'/notes-feed'} />
    )
}


