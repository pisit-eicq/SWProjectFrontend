'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import deleteReservation from '@/libs/deleteReservation';
import updateReservation from '@/libs/updateReservation';
import { ReservationItem,ReservationJson,ReservationsJson } from 'interface';


// src/app/signin/page.tsx
export default function MyBookingById() {
    const {data:session}=useSession();
    if(!session||!session.user) {
        const router=useRouter();
        router.push('/api/auth/signin');
    };

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [error, setError] = useState('');
    const router = useRouter();

    const title = 'Edit Booking';
    const description = 'chage booking date';


    const { id } = useParams();
    const varlidId=id as string;
    console.log('Booking ID:', id);

    const breadcrumbItems = [
        { label: 'Me', href: '/me' },
        { label: `Booking`, href: `/me/booking` },
        { label: `${id}`, href: `/me/booking/${id || ''}` }
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Clear previous errors
    };

    const handleUpdate=async()=>{
        try {
            const updatePromise = await updateReservation(session?.user.token, startDate ? startDate.toISOString() : "", varlidId);
            if (updatePromise.success) {
                alert('Update success');
                router.push('/me/booking'); // Redirect after update
            } else {
                setError('Failed to update reservation.');
            }
        } catch (error) {
            setError('Error updating reservation.');
        }
    }

    const handleDelete=async()=>{
        try {
            const deletePromise = await deleteReservation(session?.user.token, varlidId);
            if (deletePromise.success) {
                alert('Delete success');
                router.push('/me/booking'); // Redirect after delete
            } else {
                setError('Failed to delete reservation.');
            }
        } catch (error) {
            setError('Error deleting reservation.');
        }
    }

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
                        <div className='p-4 rounded bg-background/50 backdrop-blur-md flex justify-start items-center gap-4 border border-base-300 text-foreground w-full'>
                            <Icon icon="akar-icons:calendar" className="shrink-0" />
                            <DatePicker selected={startDate} name='date' onChange={(date) => setStartDate(date)} className='flex w-full z-10' />
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                        <Button type="submit" variant="primary" size="lg" onClick={handleUpdate}>
                            <Icon icon="akar-icons:check" className="shrink-0"/>
                            Done
                        </Button>
                        <Button type="submit" variant="outline" size="lg">
                            <Icon icon="akar-icons:close" className="shrink-0" onClick={()=>router.push('/me/booking')}/>
                            Cancel
                        </Button>
                        <Button type="submit" variant="danger" size="lg" onClick={handleDelete}>
                            <Icon icon="akar-icons:trash" className="shrink-0" />
                            Delete
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
