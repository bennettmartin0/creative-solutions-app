// app/components/Navbar.tsx
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const Navbar = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="mb-8 top-0 left-0 w-full h-12 flex justify-between items-center bg-slate-900 text-neutral-50 pl-5 pr-5 shadow-md z-50">
      <img className="w-40 m-5 filter invert" src="/img/signature.png" alt="Logo" />
      <span className="font-[NineteenFortyTwo] text-xl text-neutral-50">Creative Solutions</span>
      <li style={styles.navLinks}>
        {user ? (
          <form action="/auth/signout" method="post">
            <button type="submit" className="hover:underline">Log Out</button>
          </form>
        ) : (
          <Link href="/login">
            <span className="hover:underline">Login</span>
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