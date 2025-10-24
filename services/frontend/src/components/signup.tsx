"use client"

import { useState } from "react";
import { Input } from "./ui/input";
import { SignUpResponse, useSignup } from "@/query/signup";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const singUp = useSignup();
    const router = useRouter();

    const handleSubmit = () => {
        console.log(email, password);
        singUp.mutate({
            email, password
        },
            {
                onSuccess: (res: AxiosResponse<SignUpResponse>) => {
                    const id = res.data.data.userId;
                    router.push(`${id}/verify`)
                }
            }

        )
    }

    return (
        <>
            <div className="flex flex-col">
                <span className="text-3xl font-bold">Login Page</span>
                <form className="flex flex-col w-75" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className="my-2"></Input>
                    <Input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} className="my-2"></Input>
                    <Input type="submit" value="Submit" className="hover:bg-black hover:text-white" ></Input>
                </form>
            </div>
        </>
    )
}