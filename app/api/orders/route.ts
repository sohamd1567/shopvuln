import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET({ url }) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const orderId = url.pathname.split('/').pop();
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order || order.userId !== session.user.id) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  return new Response(JSON.stringify(order));
}