import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useURL from "../hooks/useURL";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { greeting } = useURL();

  const verifyAuth = async () => {
    const res = await axios.get(greeting, {
      withCredentials: true, // ✅ VERY IMPORTANT
    });
    return res.data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["auth-verify"],
    queryFn: verifyAuth,
    retry: false,     // ✅ don’t retry on 401
    staleTime: 0,     // ✅ always validate token
  });

  if (isLoading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
