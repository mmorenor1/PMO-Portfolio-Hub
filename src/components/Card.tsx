import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export default function Card({ 
  children, 
  className,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop
}: CardProps) {
  return (
    <div 
      className={`${className || ''}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}
