import LinkButton from "@/components/atoms/Link";

const FooterProps = [
    { href: "https://www.instagram.com/atlanticjohnson?igsh=MWFpdDM0Y3A0OWR1NA==", buttonName: "Instagram" },
    // { href: "/terms-of-service", buttonName: "Terms of Service" },
    // { href: "/contact", buttonName: "Contact" },
]

export default function Footer() {
    return (
        <div className="flex flex-col pb-5 items-center space-evenly w-full gap-4 md:flex-row md:justify-between md:items-center md:space-evenly md:w-full">
            <nav className="flex flex-col md:flex-row items-center justify-center w-full md:gap-10">
                {FooterProps.map((item) => (
                    <LinkButton key={item.href} href={item.href} buttonName={item.buttonName} className="text-foreground font-bold text-lg hover:text-foreground/80 transition-colors hover:bg-foreground/10 p-1" />
                    ))}
                </nav>
            <p className="w-full text-center text-[8px]">Built by TeenyWeeny Studio</p>
        </div>
    );
}