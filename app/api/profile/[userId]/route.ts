import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // VULNERABILITY: No check that params.userId === session.user.id
  const profile = await prisma.profile.findUnique({
    where: { userId: params.userId }
  })
  if (!profile) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(profile)
}
