// components/Navbar.tsx
import Link from "next/link";
import NavButton from "./NavButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-900 text-neutral-50 pl-5 pr-5">
      <img className="w-50 m-5 filter: invert" src="/logo2.png" alt="Logo"></img>
      <li style={styles.navLinks}>
        <NavButton href="./" text="Projects" />
        <NavButton href="/home" text="Contact" />
      </li>
    </nav>
  );
};

const styles = {


  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    fontstyle: "bold"
  },

  navItem: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
