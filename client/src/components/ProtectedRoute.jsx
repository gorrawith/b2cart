import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, requireUnverifiedUser = false }) => {
  const { user, showUserLogin} = useAppContext()

  // ยังไม่ login → เด้งกลับ /
  if (!showUserLogin || !user) {
    return <Navigate to="/" replace />;
  }

  // ถ้า requireUnverifiedUser = true → อนุญาตเฉพาะ user ที่ยังไม่ verified
  if (requireUnverifiedUser && user.isAccountVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;