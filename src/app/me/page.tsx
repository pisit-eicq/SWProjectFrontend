'use client';
import Image from 'next/image';
import { useState,useEffect} from 'react';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


// src/app/signin/page.tsx
export default function Mepage() {
    const [scroll, setScroll] = useState(0);
    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }
    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const { data: session } = useSession();
    const username = session?.user?.data.username || 'Admin';
    const role = session?.user?.data.role;
    console.log(role);


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
                            Welcome back!, {username}
                        </h1>
                        <p className="text-lg text-foreground opacity-3/4">
                            Manage your account here as {role}
                        </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <a href="/me/admin" className='w-full flex flex-col'><Button variant="secondary" className='h-full' size='lg' ><Icon icon="material-symbols:admin-panel-settings" /> Admin</Button></a>
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
