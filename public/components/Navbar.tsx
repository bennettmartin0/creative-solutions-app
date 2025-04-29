// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>LOGO</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/services">Services</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  navItem: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
