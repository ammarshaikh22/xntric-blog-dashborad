"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!email || !password) return toast.error("Invalid Email Or Password");

            const payload = { email, password };

            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const res = await response.json();

            if (!response.ok) throw new Error(res.message);
            console.log(res);
            toast.success(res.message);
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message || "Server Error");
        }
    }

    return (
        <div className="relative flex items-center min-h-screen w-full overflow-hidden bg-[url('/login.png')] bg-cover">\
            <ToastContainer />
            <div className="absolute top-10 left-14 w-[150px] h-[40px]">
                <Image src={"/xntric.png"} alt="LOGO" width={200} height={200} />
            </div>
            {/* Content container */}
            <div className="container relative z-10 mx-auto flex flex-col px-10 py-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left side content */}
                <div className="mb-10 flex flex-col justify-center lg:mb-0 lg:w-1/2">
                    <h1 className="text-4xl font-semibold font-blauer leading-tight text-white md:text-7xl">
                        Login into
                        <br />
                        your account
                    </h1>
                    <p className="mt-8 text-zinc-950 text-xl tracking-wide">Let us make the circle bigger!</p>
                </div>

                {/* Right side form */}
                <div className="w-full lg:w-1/2 lg:max-w-[490px]">
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="py-4">
                            <div className="mb-6">
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border-[#D7D7D7] placeholder:text-[#D7D7D7] rounded-[8px]"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full border-[#D7D7D7] placeholder:text-[#D7D7D7] rounded-[8px]"
                                />
                            </div>

                            <div className="mb-6 relative top-4 flex items-center justify-between">
                                <div className="text-md">
                                    {"Don't have an account? "}
                                    <Link href="/signup" className="text-primaryNeon hover:underline">
                                        Sign up
                                    </Link>
                                </div>
                                <Button type="submit" className="w-1/3 bg-primaryNeon text-white rounded-[8px] hover:bg-primaryNeon text-md">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-lg text-white">
                © {new Date().getFullYear()} Xntric. All Rights Reserved.
            </div>
        </div>
    )
}
