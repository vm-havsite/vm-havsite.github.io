
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
