"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-100 mx-auto">
        <h2 className="text-3xl font-medium py-2 my-2">Welcome to the project</h2>
        <main>
          <section>
            This project is a sample project which implements user sign up and basic auth setup. We have implemented features including signup and OTP verification

          </section>
        </main>
        <Button className="my-4 py-2" onClick={() => router.push("/signup")}>Proceed to Sign Up</Button>
      </div>
    </>
  );
}
