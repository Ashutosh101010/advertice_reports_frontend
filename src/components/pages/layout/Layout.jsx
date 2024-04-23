import { Outlet } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import TopHeader from "../header/Header";

const Layout = () => {

  
  return (
    <ProtectedRoute>
         <TopHeader />
        <main style={{ display: 'flex', flexDirection: 'column', backgroundColor: "#eee", padding: "20px"}} className="content">
          <Outlet />
        </main>
    </ProtectedRoute>
  );
};

export default Layout;
