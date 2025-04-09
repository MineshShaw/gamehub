import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/signin");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null; 

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome! Choose a game to play:</p>
        <ul className="list-disc ml-4 mt-2">
          <li>Chess</li>
          <li>Checkers</li>
          <li>Tic Tac Toe</li>
          <li>Connect Four</li>
        </ul>
        <button onClick={logout} className="btn mt-4">
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}
