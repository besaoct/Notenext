
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

type ActiveUser = {
   createdAt: string;
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
} | any