import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar";

export default function App() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
        <aside className="md:col-span-1">
          <Sidebar />
        </aside>
        <main className="md:col-span-2">
          <Outlet />
        </main>
      </div>
    </>
  );
}
