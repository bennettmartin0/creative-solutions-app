import Link from "next/link";
import NavButton from "./NavButton";

const Navbar = () => {
  return (
    <>
<div className="fixed top-0 left-0 w-full flex justify-between items-center bg-slate-900 text-neutral-50 pl-5 pr-5 shadow-md z-50">      
  <img className="w-50 m-5 filter: invert" src="/img/signature.png" alt="Logo"></img>
      <li style={styles.navLinks}>
        <NavButton href="./" text="Home" />
        <NavButton href="/contact" text="Contact" />
      </li>
    </div>
    </>
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
