// src/layouts/EmptyLayout.tsx
import { Outlet } from "react-router-dom";

const EmptyLayout = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <Outlet />
    </div>
  );
};

export default EmptyLayout;