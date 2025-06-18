import Link from 'next/link';

interface NavButtonProps {
    href: string;
    text: string;
}


const NavButton: React.FC<NavButtonProps> = ({ href, text }) => {
    return (
        <Link className='text-xl text-neutral-400 hover:text-neutral-50 hover:text-shadow-neutral-50' href={href}>{text}</Link>
    );
};

export default NavButton;