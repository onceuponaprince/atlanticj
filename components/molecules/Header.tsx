'use client';
import Logo from "../atoms/Logo";
import LinkButton from "../atoms/Link";
import ThemeToggle from "../atoms/ThemeToggle";
import BurgerMenu from "../atoms/BurgerMenu";

interface HeaderProps {
    logo: string;
    alt: string;
    width: number;
    height: number;
}

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header({ logo, alt, width, height }: HeaderProps) {
    return (
        <header className="font-primary w-full border-b border-foreground/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Logo src={logo} alt={alt} width={width} height={height} />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item) => (
                            <LinkButton 
                                key={item.name} 
                                href={item.href} 
                                buttonName={item.name}
                                className="text-foreground hover:text-foreground/80 transition-colors"
                            />
                        ))}
                    </nav>

                    {/* Desktop Theme Toggle */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button with Menu */}
                    <BurgerMenu>
                        {/* Mobile Navigation */}
                        <nav className="flex flex-col gap-3">
                            {navigation.map((item) => (
                                <LinkButton 
                                    key={item.name} 
                                    href={item.href} 
                                    buttonName={item.name}
                                    className="text-foreground hover:text-foreground/80 transition-colors text-left py-2"
                                />
                            ))}
                        </nav>
                        
                        {/* Mobile Theme Toggle */}
                        <div className="pt-2 border-t border-foreground/10">
                            <ThemeToggle />
                        </div>
                    </BurgerMenu>
                </div>
            </div>
        </header>
    );
}