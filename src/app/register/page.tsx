import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString().trim() || "";
    const username = formData.get("username")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    if (!name || !username || !email || !password) {
      // you could handle errors better later
      return;
    }

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
      },
    });

    redirect("/login");
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      <form action={register} className="space-y-4">
        <input
          name="name"
          placeholder="Full name"
          className="w-full p-2 rounded bg-neutral-800 text-neutral-100"
        />
        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded bg-neutral-800 text-neutral-100"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-neutral-800 text-neutral-100"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-neutral-800 text-neutral-100"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}