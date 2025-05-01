import Link from 'next/link';

interface NavButtonProps {
    href: string;
    text: string;
}

const NavButton: React.FC<NavButtonProps> = ({ href, text }) => {
    return (
        <Link href={href}>{text}</Link>
    );
};

export default NavButton;