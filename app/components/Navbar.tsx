// app/components/Navbar.tsx
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";




const Navbar = async () => {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className=" top-0 left-0 w-full h-12 flex justify-between items-center bg-slate-900 text-neutral-50 pl-5 pr-5 shadow-md z-50">
      <span className="font-[signature] text-2xl text-neutral-50">
        Bennett Martin
      </span>

      <span className="font-[Montserrat] font-thin text-sm text-neutral-50">Creative Solutions</span>
      <li style={styles.navLinks}>
        {user ? (
          <form action="/auth/signout" method="post">
            <button type="submit" className="hover:underline">Log Out</button>
          </form>
        ) : (
          <Link href="/login">
            <span className="font-sans text-sm hover:underline">Login</span>
          </Link>
        )}
      </li>
    </div>
  );
};

const styles = {
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    fontWeight: "bold",
  } as React.CSSProperties,
};

export default Navbar;