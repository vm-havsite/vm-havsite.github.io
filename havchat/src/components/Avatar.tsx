
import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  status?: "online" | "offline" | "away";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  status,
  size = "md",
  className,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "rounded-full flex items-center justify-center bg-primary text-primary-foreground font-medium overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full",
            {
              "bg-green-500": status === "online",
              "bg-gray-400": status === "offline",
              "bg-yellow-400": status === "away",
            }
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
