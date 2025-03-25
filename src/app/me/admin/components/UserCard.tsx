import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

type UserCardProps = {
    type: "Banned" | "Active" | "Inactive";
    name: string;
    email: string;
    phone: string;
    role: string;
    userId: string;
    key?: number;
    onEdit: (userId: string) => void;
    onDelete: (userId: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({ type, name, email, phone, role, userId, onEdit, onDelete, key }) => {
    const badgeStyles = {
        Banned: "bg-danger text-on-danger",
        Active: "bg-success text-on-success",
        Inactive: "bg-warning text-on-warning",
    };

    return (
        <div className="relative p-4 rounded-lg bg-background/50 backdrop-blur-md flex justify-between xl:items-center items-start xl:flex-row flex-col gap-4 border border-base-300 text-foreground">
            <span className={`absolute left-0 top-0 z-0 w-[4px] h-full rounded-full block ${badgeStyles[type]}`}></span>
            <div className="flex gap-4 items-center">
                <span className={`p-2 rounded-full ${badgeStyles[type]} text-xs`}>{type}</span>
                <div>
                    <code>
                        id : {userId}
                    </code>
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm opacity-3/4">{email}</p>
                </div>
            </div>
            <div className="flex gap-4">
                <p className="text-sm opacity-3/4">{phone}</p>
                <p className="text-sm opacity-3/4">{role}</p>
                <div className="flex gap-2">
                    {
                        type === "Banned" ? (
                            <Button onClick={() => onEdit(userId)} variant="secondary" size="md">
                                <Icon icon="mdi:play" className="shrink-0" />
                            Unban
                        </Button>
                        ):(
                            <Button onClick={() => onEdit(userId)} variant="danger" size="md">
                                <Icon icon="mdi:block" className="shrink-0" />
                            Ban
                        </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default UserCard;