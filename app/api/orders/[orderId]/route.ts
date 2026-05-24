import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // VULNERABILITY: No check that order.userId === session.user.id
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { user: { select: { name: true, email: true } } }
  })
  if (!order) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(order)
}
