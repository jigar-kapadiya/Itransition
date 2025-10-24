"use client"

import { Input } from "@/components/ui/input";
import { useVerify } from "@/query/verify";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
    const { id } = useParams();
    const [code, setCode] = useState<string>("");
    const verify = useVerify();

    const handleSubmit = () => {
        console.log(id, code);
        verify.mutate({
            userId: id?.toString()!, otp: code
        })
    }

    return (
        <div className="flex mx-auto h-[100%] w-100 justify-center items-center">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col">
                <div className="mt-2">
                    <span className="text-2xl font-semibold">Verify your code</span>
                    <Input className="mt-2" onChange={(e) => setCode(e.target.value)} required></Input>
                </div>
                <div className="mt-4">
                    <Input type="submit" value="Submit" className="hover:bg-black hover:text-white"></Input>
                </div>
            </form>
        </div>
    )
}