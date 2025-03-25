'use client';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrum';
import Card from './components/Card';
import { Icon } from '@iconify/react/dist/iconify.js';
import Input from '@/components/ui/Input';
import getReservations from '@/libs/getReservations';
import { ReservationJson,ReservationItem } from 'interface';


// src/app/signin/page.tsx
export default function MyBooking() {
    const {data:session}=useSession();
    if(!session||!session.user) return <div>Please Login</div>;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [reservationData, setReservationData] = useState<ReservationItem[]>([]);
    const router = useRouter();

    // Fetch reservations after session is available
    useEffect(() => {
        const fetchReservations = async () => {
            if (session?.user?.token) {
                const reservations = await getReservations(session.user.token);
                setReservationData(reservations.data); // Set the reservation data to state
            }
        };
        if (session) {
            fetchReservations(); // Call the function when session is available
        }
    }, [session]);

    const breadcrumbItems = [
        { label: 'Me', href: '/me' },
        { label: `Booking`, href: `/me/booking` }
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        const result = await signIn('credentials', { // 'credentials' provider
            email,
            password,
            redirect: false, // Stay on the page after sign-in
        });

        if (result?.error) {
            setError('Invalid credentials. Please check your email and password.');
        } else if (result?.ok) {
            router.push('/booking'); // Redirect to booking page on successful login
        }
    };

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

    return (
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />

            <div className="mx-auto max-w-6xl pt-32 px-16 flex flex-col gap-8 relative">
                <div className={`sticky top-20 left-0 z-10 p-4 flex flex-wrap justify-between items-center gap-4 rounded-lg ${scroll > 28 ? 'shadow-lg bg-background/50 backdrop-blur-3xl' : ''}`}>
                    <div>
                        <Breadcrumb items={breadcrumbItems} />
                        <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">
                            My Bookings
                        </h1>
                        <p className="text-lg text-foreground opacity-3/4">
                            Explore your bookings and manage them here
                        </p>
                        <Input placeholder='Search for a restaurant' icon="mdi:search" size='sm' className='mt-4' />
                    </div>
                    <a href='/booking' className='h-full flex items-center'>
                        <Button variant="secondary" className='h-full' ><Icon icon="mdi:plus" className='shrink-0' />Booking</Button>
                    </a>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {
                        reservationData.length>0? ( reservationData.map((reservation:ReservationItem)=>(
                            <Card title={reservation.restaurant.name} date={reservation.apptDate} href={`/me/booking/${reservation._id}`} id={reservation._id} key={reservation._id}/>
                        ))):(
                            <p>No reservations found.</p>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
