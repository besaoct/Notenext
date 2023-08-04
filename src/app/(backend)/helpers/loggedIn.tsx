
import { redirect } from "next/navigation"
import getCurrentUser from "./getCurrentUser"

export default async function Loggedin() {
    const session = await getCurrentUser()

    if (session) {
        redirect('/')
    }
}

