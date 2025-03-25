"use client";
import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Button from './ui/Button';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; 
import { Session } from 'next-auth';

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState<Session|null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();
    }, []);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-99 flex items-center justify-between p-4 text-foreground transition-all  ${scrolled ? "bg-background/50 h-16 backdrop-blur-3xl shadow-md px-8" : "bg-transparent h-24 px-16"}`} >
            <a href="/" className="text-xl font-bold">
                Resturant Manager
            </a>
            <ul className="space-x-4 items-center hidden xl:flex">
                <li><a href="/booking">Booking</a></li>
                <li><a href="/me/booking">My booking</a></li>
                {session ? (
                    <li>
                        <a href="/me">
                            <Button variant="secondary" className='flex gap-2 items-center'>
                                <Icon icon="mdi:account" className='shrink-0' />
                            </Button>
                        </a>
                    </li>
                ) : (
                    <li className='flex flex-row '>
                        <a href="/register"><Button variant="primary" className='flex gap-2 items-center mx-2'>Sign-Up</Button></a>
                        <a href="/api/auth/signin"><Button variant="primary" className='flex gap-2 items-center'><Icon icon="mdi:login" className='shrink-0' />Login</Button></a>
                    </li>
                )}
            </ul>
            {open && (
                <div className='xl:hidden absolute top-0 right-0 p-4 w-full h-screen bg-background/50 backdrop-blur-3xl shadow-md'>
                    <div className="space-x-4 items-center flex flex-col gap-2">
                        <Button variant="outline" className='flex gap-2 items-center w-full' onClick={closeMenu}>
                            <Icon icon="mdi:close" className='shrink-0' />Close
                        </Button>
                        <a href="/booking" className='w-full text-center' onClick={closeMenu}>Booking</a>
                        <a href="/me/booking" className='w-full text-center' onClick={closeMenu}>My booking</a>
                        <a href={
                            session ? "/me" : "/api/auth/signin"
                        } className='w-full' onClick={closeMenu}>
                            {session ? (
                                <Button variant="secondary" className='flex gap-2 items-center text-center w-full'>
                                    <Icon icon="mdi:account
                            " className='shrink-0' />
                                </Button>
                            ) : (
                                <li>
                                    <Button variant="primary" className='flex gap-2 items-center text-center w-full'>
                                        Sign-Up
                                    </Button>
                                    <Button variant="primary" className='flex gap-2 items-center text-center w-full'>
                                        <Icon icon="mdi:login" className='shrink-0' />Login
                                    </Button>
                                </li>
                            )}
                        </a>
                    </div>
                </div>
            )}
            <button className='flex xl:hidden' onClick={toggleMenu}>
                <Icon icon="mdi:menu" className='shrink-0' />
            </button>
        </nav>
    );
}