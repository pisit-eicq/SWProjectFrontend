"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userLogIn from "@/libs/userLogin";
import Button from "@/components/ui/Button";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(""); // เคลียร์ error ก่อนยิง API

        try {
            const data = await userLogIn(email, password);

            // เก็บ Token ลง localStorage
            localStorage.setItem("token", data.token);

            // รีไดเรกต์ไปหน้า booking หลังล็อกอินสำเร็จ
            router.push("/booking");
        } catch (err: any) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <main className="relative h-screen w-screen flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 w-[calc(100vw-32px)] min-w-auto md:min-w-xl md:w-auto transform -translate-x-1/2 -translate-y-1/2 z-10 text-left bg-background/50 p-8 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">Sign In</h1>
                    <p className="text-lg text-foreground opacity-3/4">
                        Explore our venues. Click on a venue to view more details.
                    </p>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-4 rounded bg-background/50 backdrop-blur-md border border-base-300 text-foreground"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-4 rounded bg-background/50 backdrop-blur-md border border-base-300 text-foreground"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary" size="lg">
                        Sign In
                    </Button>
                    <div className="border-t border-base-300"></div>
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="text-primary">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}
