"use client";
import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Button from './ui/Button';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

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
                {user ? (
                    <li>
                        <a href="/me">
                            <Button variant="secondary" className='flex gap-2 items-center'>
                                <Icon icon="mdi:account
                            " className='shrink-0' />
                            </Button>
                        </a>
                    </li>
                ) : (
                    <li>
                        <a href="/signin"><Button variant="primary" className='flex gap-2 items-center'><Icon icon="mdi:login" className='shrink-0' />Login</Button></a>
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
                            user ? "/me" : "/signin"
                        } className='w-full' onClick={closeMenu}>
                            {user ? (
                                <Button variant="secondary" className='flex gap-2 items-center text-center w-full'>
                                    <Icon icon="mdi:account
                            " className='shrink-0' />
                                </Button>
                            ) : (
                                <Button variant="primary" className='flex gap-2 items-center text-center w-full'>
                                    <Icon icon="mdi:login" className='shrink-0' />Login
                                </Button>
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