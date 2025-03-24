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
    description?: string;
    image?: string;
    price?: number;
    rating?: number;
};

const Card: React.FC<CardProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className,
    href,
    title,
    description,
    image,
    price,
    rating,
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
                <h1 className="text-2xl font-dela">
                    {title}
                </h1>
                <p>
                    {description}
                </p>
                <span>
                    {price} THB
                </span>
                {/* <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <Icon
                            key={index}
                            icon={index < (rating || 0) ? "mdi:star" : "mdi:star-outline"}
                            className="text-foreground"
                        />
                    ))}
                </div> */}
            </div>
        </a>
    );
};

export default Card;