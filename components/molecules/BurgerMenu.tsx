'use client';
import React, { useState, useEffect, useRef } from 'react';
import BurgerButton from '../atoms/BurgerButton';

interface BurgerMenuProps {
  children?: React.ReactNode;
}

export default function BurgerMenu({ children }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(true);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="" ref={menuRef}>
      <BurgerButton handleClick={handleClick} isOpen={isOpen} />
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 right-0 h-screen w-screen m-0 p-0 bg-background border border-foreground/20 rounded-lg shadow-lg z-50 md:hidden animate-in fade-in slide-in-from-top-100 ease-in-out">
          <BurgerButton handleClick={handleClick} isOpen={isOpen} className="absolute top-2 right-4 slide-out-to-top-100 ease-in-out duration-300 animate-out justify-self-center justify-center items-center text-center align-middle"/>
          <div className="flex flex-col gap-3 mx-auto h-full w-full justify-self-center justify-center items-center text-center align-middle border-t border-foreground/20 justify-self-center justify-center items-center text-center align-middle">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}