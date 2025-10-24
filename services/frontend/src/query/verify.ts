"use client"

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export function useVerify() {
    return useMutation({
        mutationFn: ({ userId, otp }: { userId: string, otp: string }) => {
            return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/verify/${userId}`, {
                otp
            })
        }, 
        onSuccess: (response: AxiosResponse) => {
            console.log("User verified successfully", response.data);
        }
    })
}