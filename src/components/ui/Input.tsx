import React from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

type InputProps = {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  icon?: string; // Iconify icon name
  size?: "sm" | "md" | "lg" | "xl"; // New size prop
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className,
  disabled = false,
  error = false,
  icon,
  size = "md", // Default size is "md"
}) => {
  const baseStyles =
    "rounded bg-background/50 backdrop-blur-md flex justify-start items-center gap-4 z-0 border border-base-300 text-foreground w-full";
  const variantStyles = clsx({
    "bg-base-100 text-foreground border-base-300 focus:ring-base-500":
      !error && !disabled,
    "bg-base-200 text-base-600 border-base-400 cursor-not-allowed": disabled,
    "bg-danger text-on-danger border-danger focus:ring-danger-hover": error,
  });
  const sizeStyles = clsx({
    "p-2 text-sm": size === "sm",
    "p-3 text-base": size === "md",
    "p-4 text-lg": size === "lg",
    "p-5 text-xl": size === "xl",
  });

  return (
    <div className={className}>
      <div className={`${baseStyles} ${variantStyles} ${sizeStyles}`}>
        {icon && <Icon icon={icon} className="shrink-0" />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex w-full bg-transparent border-none outline-none text-foreground"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Input;