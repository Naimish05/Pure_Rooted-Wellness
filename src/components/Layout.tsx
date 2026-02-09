import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  dark: boolean;
  toggle: () => void;
}

export default function Layout({ dark, toggle }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar dark={dark} toggle={toggle} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
