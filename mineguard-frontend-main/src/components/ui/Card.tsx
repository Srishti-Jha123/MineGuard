import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border relative overflow-hidden",
        className
      )} 
      {...props}
    >
      {/* Industrial Corner Accents */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-muted-foreground/30" />
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-muted-foreground/30" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-muted-foreground/30" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-muted-foreground/30" />
      
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("px-4 py-3 border-b border-border bg-white/[0.02]", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={cn("text-[11px] font-black tracking-[2px] uppercase text-white", className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
