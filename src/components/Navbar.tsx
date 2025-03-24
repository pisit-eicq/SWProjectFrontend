"use client";
import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Button from './ui/Button';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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
    return (
        <nav className={`fixed top-0 left-0 right-0 z-99 flex items-center justify-between p-4 text-foreground transition-all  ${scrolled ? "bg-background/50 h-16 backdrop-blur-3xl shadow-md px-8":"bg-transparent h-24 px-16"}`} >
            <a href="/" className="text-xl font-bold">
            Resturant Manager
            </a>
            <ul className="flex space-x-4 items-center">
                <li><a href="/booking">Booking</a></li>
                <li><a href="/mybooking">My booking</a></li>
                <li>
                    <a href="/signin"><Button variant="outline" className='flex gap-2 items-center'><Icon icon="mdi:login" className='shrink-0'/>Login</Button></a>
                </li>
            </ul>
        </nav>
    );
}