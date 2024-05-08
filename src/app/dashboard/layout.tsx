import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "./page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Fast Leads",
  description: "Manage and track all your leads progress",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}