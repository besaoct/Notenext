
type Meta = {
    author:string 
    slug: string
    id: string,
    title: string,
    content:string,
    createdAt: Date | string
    isPublic: boolean
}

type NoteType = {
    meta: Meta,
}