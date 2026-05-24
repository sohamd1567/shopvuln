import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form action={loginAction} className="w-full max-w-sm rounded border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign in to ShopVuln</h1>
        {searchParams.error ? (
          <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password.
          </p>
        ) : null}
        <label className="mb-2 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mb-4 w-full rounded border px-3 py-2"
          placeholder="victim@shopvuln.com"
        />
        <label className="mb-2 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mb-6 w-full rounded border px-3 py-2"
          placeholder="password123"
        />
        <button
          type="submit"
          className="w-full rounded bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
