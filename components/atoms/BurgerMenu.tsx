'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

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
        setIsOpen(false);
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
    <div className="relative" ref={menuRef}>
      <Button 
        onClick={handleClick} 
        className="flex flex-col justify-center items-center md:hidden"
        ariaLabel="Burger Menu"
        aria-expanded={isOpen}
      >
        <span className={`block transition-all duration-300 ease-out bg-foreground
                        h-0.5 w-6 rounded-sm ${isOpen ? 
                        'rotate-45 translate-y-1' : '-translate-y-0.5'
                        }`} >
        </span>
        <span className={`bg-foreground block transition-all duration-300 ease-out 
                        h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
                        'opacity-0' : 'opacity-100'
                        }`} >
        </span>
        <span className={`bg-foreground block transition-all duration-300 ease-out 
                        h-0.5 w-6 rounded-sm ${isOpen ? 
                        '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                        }`} >
        </span>    
      </Button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-foreground/20 rounded-lg shadow-lg p-4 z-50 md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}