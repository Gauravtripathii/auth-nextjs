"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log(error);
        }
    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl m-2">Profile</h1>
      <p>User Profile</p>

      <button onClick={logout} className="mt-3 border-2 p-2">Logout</button>
    </div>
  );
}
