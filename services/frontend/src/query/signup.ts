"use client"

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";


export type SignUpResponse = { data: { userId: string } }


export function useSignup() {
    return useMutation({
        mutationFn: (payload: { email: string, password: string }) => {
            return axios.post('http://localhost:3000/users/signup', {
                ...payload
            });

        },
        onSuccess: (response: AxiosResponse<SignUpResponse>) => {
            console.log("request succeeded", response.data);
        }
    })
}