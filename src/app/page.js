import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session && session.user) {
    redirect("/dashboard");
  }
}
