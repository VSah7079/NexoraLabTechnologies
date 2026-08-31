// src/layouts/EmptyLayout.tsx
import { Outlet } from "react-router-dom";

const EmptyLayout = () => {
  return (
    <div className="min-h-screen bg-white/90 backdrop-blur-sm">
      <Outlet />
    </div>
  );
};

export default EmptyLayout;