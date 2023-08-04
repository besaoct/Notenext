import { getServerSession } from "next-auth/next"

import {Options} from "../api/auth/[...nextauth]/authOptions";
import prisma from "../../(frontend)/lib/prismadb";

export async function getSession() {
  return await getServerSession(Options)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
