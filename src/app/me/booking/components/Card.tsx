import clsx from "clsx";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

type CardProps = {
    children?: React.ReactNode;
    variant?: 'primary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
    href?: string;
    title?: string;
    date?: string;
    time?: string;
    price?: number;
    id?: string;
};

const Card: React.FC<CardProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className,
    href,
    title,
    date,
    time,
    price,
    id,
}) => {
    const baseStyles = "rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 relative";
    const variantStyles = {
        primary: "bg-background text-foreground hover:bg-base-200 border border-base-300 focus:ring-base-500",
    };
    const sizeStyles = {
        sm: "px-3 py-3 text-sm",
        md: "px-6 py-6 text-base",
        lg: "px-8 py-8 text-lg",
    };

    const classes = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
    );

    return (
        <a className={classes} href={href} onClick={onClick}>
            <Icon icon="mdi:open-in-new" className="absolute top-4 right-4" />
            <div>
                <code>
                    id : {id}
                </code>
                <h1 className="text-2xl font-dela">
                    {title}
                </h1>
                <p>
                    {date}
                </p>
                <p>
                    {time}
                </p>
                <span>
                    {price}
                </span>
            </div>
        </a>
    );
};

export default Card;