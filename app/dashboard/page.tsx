import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Welcome, {session.user.name}</h1>
      <section className="rounded border bg-white">
        <div className="border-b px-5 py-4">
          <h2 className="text-xl font-semibold">Your Orders</h2>
        </div>
        <div className="divide-y">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block px-5 py-4 hover:bg-slate-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Order {order.id}</p>
                  <p className="text-sm text-slate-600">
                    {order.createdAt.toLocaleDateString()} · {order.status}
                  </p>
                </div>
                <p className="font-semibold">${order.total.toFixed(2)}</p>
              </div>
            </Link>
          ))}
          {orders.length === 0 ? (
            <p className="px-5 py-4 text-slate-600">No orders found.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
