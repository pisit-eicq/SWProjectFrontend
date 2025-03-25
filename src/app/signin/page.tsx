/*"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function SignInPage() {
    const { data: session } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push("/booking");    
        }
    }, [session, router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // ป้องกันการ redirect อัตโนมัติ
        });

        if (result?.error) {
            setError("Invalid email or password. Please try again.");
        } else {
            router.push("/booking");
        }
    };

    return (
        <main className="relative h-screen w-screen flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-background/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-foreground uppercase">Sign In</h1>
                <p className="text-lg text-foreground opacity-3/4">Explore our venues. Click on a venue to view more details.</p>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
                    <Button type="submit" variant="primary" size="lg">Sign In</Button>
                    <div className="border-t border-base-300"></div>
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="text-primary">Sign up</a>
                    </p>
                </form>
            </div>
        </main>
    );
}*/
