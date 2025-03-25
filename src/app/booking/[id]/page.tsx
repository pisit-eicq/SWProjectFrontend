'use client';
import Image from 'next/image';
import { FormEvent, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addReservation from '@/libs/addReservation';

export default function SignInPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = useParams();
    const ValidId = id as string;

    const breadcrumbItems = [
        { label: 'Booking', href: '/booking' },
        { label: `${id}`, href: `/booking/${id || ''}` }
    ];

    const title = 'Booking';
    const description = 'New Booking';

    const { data: session } = useSession();

    useEffect(() => {
        if (!session || !session.user) {
            router.push('/api/auth/signin');
        }
    }, [session, router]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!startDate) {
            setError('Please select a valid date.');
            return;
        }

        try {
            if(session){
                const reservation = await addReservation(session.user.token, startDate.toISOString(), ValidId);
                if (reservation.success) {
                    alert('Reservation created successfully!');
                    router.push('/me/booking');
                } else {
                    setError('Failed to create reservation. Please try again.');
                }
            }
        } catch (error) {
            setError('Failed to create reservation. Please try again.');
        }
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
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                        <div className='p-4 rounded bg-background/50 backdrop-blur-md flex justify-start items-center gap-4 border border-base-300 text-foreground w-full z-10'>
                            <Icon icon="akar-icons:calendar" className="shrink-0" />
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date | null) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" variant="primary" size="lg">
                            Book
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}