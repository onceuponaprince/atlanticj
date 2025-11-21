import LinkButton from "@/components/atoms/Link";

const FooterProps = [
    { href: "/privacy-policy", buttonName: "Privacy Policy" },
    { href: "/terms-of-service", buttonName: "Terms of Service" },
    { href: "/contact", buttonName: "Contact" },
]

export default function Footer() {
    return (
        <div>
            <h1>Footer</h1>
            {FooterProps.map((item) => (
                <LinkButton key={item.href} href={item.href} buttonName={item.buttonName} />
            ))}
        </div>
    );
}