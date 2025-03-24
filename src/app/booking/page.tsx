'use client';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from './components/Card';
import getRestaurants from '@/libs/getRestaurants';
import Input from '@/components/ui/Input';
import { RestaurantItem } from 'interface';


// src/app/signin/page.tsx
export default async function SignInPage() {

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

        const restaurant=await getRestaurants();

    return (
        <main className="relative">
            <img src="/Gradient3.svg" className='absolute top-0 left-0 z-0 w-fit h-auto opacity-50 blur-md invert dark:invert-0' alt="gd3" />

            <div className="mx-auto max-w-6xl pt-32 px-16 flex flex-col gap-8 relative">
                <div className={`sticky top-20 left-0 z-10 p-4 flex flex-wrap justify-between items-center gap-4 rounded-lg ${scroll > 28 ? 'shadow-lg bg-background/50 backdrop-blur-3xl' : ''}`}>
                    <div>
                        <h1 className="text-4xl font-semibold font-dela text-foreground uppercase">
                            BOOKING
                        </h1>
                        <p className="text-lg text-foreground opacity-3/4">
                            Explore our selection of restaurants and book a table.
                        </p>
                        <Input placeholder='Search for a restaurant' icon="mdi:search" size='sm' className='mt-4' />
                    </div>
                    <a href='/me/booking' className='h-full flex items-center'>
                        <Button variant="secondary" className='h-full' >My Bookings</Button>
                    </a>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {restaurant.data.map((restaurant:RestaurantItem) => (
                        <Card key={restaurant._id} title={restaurant.name} description={`Address ${restaurant.address} |   Tel. ${restaurant.tel} | Open-Close ${restaurant.office_hours.open} - ${restaurant.office_hours.close} ${restaurant.office_hours.tz}`} href={`/booking/${restaurant._id}`} />
                    ))}
                </div>
            </div>
        </main>
    );
}