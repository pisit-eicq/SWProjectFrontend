'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// src/app/signin/page.tsx
export default function SignInPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState('');
    const router = useRouter();

    let title = 'Placeholder';
    let description = 'lore ipsum';


    const { id } = useParams();
    console.log('Booking ID:', id);

    const breadcrumbItems = [
        { label: 'Booking', href: '/booking' },
        { label: `${id}`, href: `/booking/${id || ''}` }
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Clear previous errors
    };

    return (
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />
            <div className="mx-auto max-w-6xl pt-32 px-16 relative">
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
                    <div>
                        <Button variant="ghost" className='flex items-center gap-2 mb-4' size="sm">
                            <Icon icon="akar-icons:arrow-left" className="shrink-0" />
                            Back
                        </Button>
                        <Breadcrumb items={breadcrumbItems} />
                        <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">
                            {title}
                        </h1>
                        <p className="text-lg text-foreground opacity-3/4">
                            {description}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <div className='p-4 rounded bg-background/50 backdrop-blur-md flex justify-start items-center gap-4 z-0 border border-base-300 text-foreground w-full'>
                            <Icon icon="akar-icons:clock" className="shrink-0" />
                            <input
                                type="time"
                                name="time"
                                className="flex w-full bg-transparent border-none outline-none text-foreground"
                            />
                        </div>
                        <div className='p-4 rounded bg-background/50 backdrop-blur-md flex justify-start items-center gap-4 border border-base-300 text-foreground w-full'>
                            <Icon icon="akar-icons:calendar" className="shrink-0" />
                            <DatePicker selected={startDate} name='date' onChange={(date) => setStartDate(date)} className='flex w-full z-10' />
                        </div>
                        <Button type="submit" variant="primary" size="lg">
                            Book
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}