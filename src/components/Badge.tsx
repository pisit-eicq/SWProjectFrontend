import React from "react";
import clsx from "clsx";

type BadgeProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ label, active = false, onClick, className }) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer select-none";
  const variantStyles = clsx({
    "bg-base-100 text-foreground border border-base-300 hover:bg-base-200":
      !active,
    "bg-base-500 text-on-danger border border-base-500 hover:bg-base-600":
      active,
  });

  return (
    <span
      className={clsx(baseStyles, variantStyles, className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  );
};

export default Badge;