'use client';
import { useState,useEffect} from 'react';
import Button from '@/components/ui/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


// src/app/signin/page.tsx
export default function MePage() {
    const { data:session } = useSession();
    if(!session||!session.user) return <div>Please Login</div>
    const [scroll, setScroll] = useState(0);
    const [error, setError] = useState<string>('');
    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [session]); // Dependency array ensures fetching is done once session is available

    return (
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />
            <div className="mx-auto max-w-6xl pt-32 px-16 relative">
                <div className='flex flex-col gap-8'>
                    <div className={`sticky top-20 left-0 z-10 p-4 rounded-lg ${scroll > 28 ? 'shadow-lg bg-background/50 backdrop-blur-3xl' : ''}`}>
                        <a href="/">
                            <Button variant="ghost" className='flex items-center gap-2 mb-4' size="sm">
                                <Icon icon="akar-icons:arrow-left" className="shrink-0" />
                                Back
                            </Button>
                        </a>
                        <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">
                            Welcome back!, {session.user.username}
                        </h1>
                        <p className="text-lg text-foreground opacity-3/4">
                            Manage your account here as {session.user.role}.
                        </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            (session.user.role==="admin")? <a href="/me/admin" className='w-full flex flex-col'><Button variant="secondary" className='h-full' size='lg' ><Icon icon="material-symbols:admin-panel-settings" /> Admin</Button></a>:null
                        }
                        <Link href="/me/booking" className='w-full flex flex-col'>
                        <Button variant="primary" className='h-full' size='lg' ><Icon icon="mdi:book" /> My Bookings</Button>
                        </Link>
                        <Link href="/api/auth/signout" className='w-full flex flex-col'>
                        <Button variant="danger" className='h-full' size='lg' ><Icon icon="mdi:logout" /> Logout</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
