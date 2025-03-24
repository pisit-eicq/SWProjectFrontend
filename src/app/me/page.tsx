'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';


// src/app/signin/page.tsx
export default function SignInPage() {
    const username = 'Placeholder';
    return (
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />
            <div className="mx-auto max-w-6xl pt-32 px-16 relative">
                <div className='flex flex-col gap-8'>
                    <div>
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
                            Manage your account here
                        </p>
                    </div>
                    <Button variant="primary" className='h-full' size='lg' ><Icon icon="mdi:book"/> My Bookings</Button>
                </div>
            </div>
        </main>
    );
}