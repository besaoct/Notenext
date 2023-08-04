import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import {Options} from "../api/auth/[...nextauth]/authOptions";

export default async function Loggedin() {
    const session = await getServerSession(Options)

    if (session) {
        redirect('/')
    }
}

