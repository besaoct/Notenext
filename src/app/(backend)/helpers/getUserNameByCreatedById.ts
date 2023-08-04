import prisma from "../../lib/prismadb";

export async function getUserNameByCreatedById(createdById: string): Promise<string> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: createdById,
      },
      select: {
        name: true,
      },
    });
    if (!user?.name) return 'Anonymous';
    const nameParts = user.name;
    return nameParts
  } catch (error: any) {
    throw new Error(error);
  }
}
