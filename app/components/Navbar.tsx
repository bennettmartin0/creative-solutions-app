import Link from "next/link";
import NavButton from "./NavButton";

const Navbar = () => {
  return (
    <>
      <div className="mb-8 top-0 left-0 w-full h-12 flex justify-between items-center bg-slate-900 text-neutral-50 pl-5 pr-5 shadow-md z-50">      
        <img className="w-40 m-5 filter: invert" src="/img/signature.png" alt="Logo"></img>
        <span className='font-[NineteenFortyTwo] text-xl text-neutral-50'>Creative Solutions</span>
        <li style={styles.navLinks}>
          <NavButton href="\login" text="Login" />
        </li>
      </div>
    </>
  );
};

const styles = {
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    fontstyle: "bold" },

};

export default Navbar;
