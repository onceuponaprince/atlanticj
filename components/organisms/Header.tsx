'use client';
import Logo from "../atoms/Logo";
import LinkButton from "../atoms/Link";
import ThemeToggle from "../atoms/ThemeToggle";
import BurgerMenu from "../molecules/BurgerMenu";
import { useTheme } from "next-themes";


const navigation = [
    { name: "Home", href: "/" },
    // { name: "About", href: "/about" },
    // { name: "Contact", href: "/contact" },
];

export default function Header() {
    const { theme } = useTheme();
    return (
        <header className="font-primary w-screen border-b border-foreground/10 relative">
            <div className="container px-4 sm:px-6 md:w-screen md:flex md:justify-self-center">
                <div className="flex items-center justify-around space-evenly h-16 w-full">
                    {/* Left section: Logo + Desktop Navigation */}
                    <div className="flex items-center gap-6">
                        {/* <Logo src={logo} alt={alt} width={width} height={height} /> */}
                        <nav className="hidden md:flex md:pl-10 md:font-bold items-center gap-6">
                            {navigation.map((item) => (
                                <LinkButton 
                                    key={item.name} 
                                    href={item.href} 
                                    buttonName={item.name}
                                    className="text-foreground hover:text-foreground/80 transition-colors"
                                />
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center w-full ml-10 md:justify-center">
                    {theme === 'dark' ? (
                        <Logo src="/logo-white.png" alt="Logo" width={32} height={32} className="hover:bg-foreground/10 p-1 rounded-md transition-colors bg-amber-600"/>
                    ) : (
                        <Logo src="/logo-black.png" alt="Logo" width={32} height={32} className="hover:bg-foreground/10 p-1 rounded-md transition-colors bg-amber-600"/>
                    )}
                    </div>
                    {/* Right section: Theme toggle + Burger menu */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex md:w-full md:flex-row-reverse">
                            <ThemeToggle />
                        </div>

                        <BurgerMenu>
                            {/* Mobile Navigation */}
                            <nav className="flex flex-col gap-3 w-full justify-self-center justify-center items-center text-center align-middle">
                                {navigation.map((item) => (
                                    <LinkButton 
                                        key={item.name} 
                                        href={item.href} 
                                        buttonName={item.name}
                                        className="flex justify-self-center font-bold items-center align-middle text-foreground text-center hover:text-foreground/80 hover:bg-foreground/10 p-0 transition-colors "
                                    />
                                ))}
                            </nav>
                            {/* Mobile Theme Toggle */}
                            <div className="pt-6 border-t border-foreground/10 mx-auto h-[20vh] w-[50%] justify-self-center justify-center items-center text-center align-middle">
                                <ThemeToggle />
                            </div>
                        </BurgerMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}