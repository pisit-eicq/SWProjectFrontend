'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrum';
import { Icon } from '@iconify/react/dist/iconify.js';
import UserCard from './components/UserCard';
import Input from '@/components/ui/Input';
import { getUsers,banUser,unbanUser } from '@/libs/adminController';
import { useSession } from 'next-auth/react';
import { UserItem } from 'interface';

export default function SignInPage() {
    const [scroll, setScroll] = useState(0);
    const [users, setUsers] = useState<UserItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session } = useSession();

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.user?.token) {
                try {
                    const data = await getUsers(session.user?.token);
                    console.log(data.data);
                    setUsers(data.data);
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            }
        };
        fetchUsers();
    }, [session]);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const username = session?.user?.data.username || 'Admin';
    const role = session?.user?.data.role || 'Admin';

    if (role !== 'admin' || !session) {
        const router = useRouter();
        router.push('/');
    }

    async function handleClickBan(userId: string) {
        if (session?.user?.token) {
            try {
                const user = users.find(user => user._id === userId);
                if (user) {
                    if (user.banned) {
                        await unbanUser(session.user.token,userId);
                        setUsers(prevUsers =>
                            prevUsers.map(u =>
                                u._id === userId ? { ...u, banned: false } : u
                            )
                        );
                    } else {
                        await banUser(session.user.token,userId);
                        setUsers(prevUsers =>
                            prevUsers.map(u =>
                                u._id === userId ? { ...u, banned: true } : u
                            )
                        );
                    }
                }
            } catch (error) {
                console.error('Failed to update user status:', error);
            }
        }
        // refresh the users list
        const data = await getUsers(session.user?.token);
        setUsers(data.data);
    }

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
                            Manage your account here as {role}.
                        </p>
                        <Input
                            placeholder='Search for a user'
                            icon="mdi:search"
                            size='sm'
                            className='mt-4'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <UserCard
                                    key={user._id}
                                    name={user.username}
                                    email={user.email}
                                    userId={user._id}
                                    type={user.banned ? 'Banned' : 'Active'}
                                    onEdit={(userId) => handleClickBan(userId)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No users found.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}