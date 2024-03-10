import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { logout } from "../firebase";

export default function Landing() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Fetch the user's display name from Firestore
    const fetchUsername = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUsername(doc.data().username);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
      <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-pink-300"> Welcome, {username || "User"}! •ᴗ• </h1>
      </div>
      <div className="flex flex-col items-center mb-12">
        <div className="mb-4">
          <Link to="/profile">
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full block">
              Account Settings
            </button>
          </Link>
        </div>
        <div className="mb-4">
          <Link to="/todo">
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full block">
              Todo App
            </button>
          </Link>
        </div>
        <div className="mb-4">
          <Link to="/">
            <button onClick={logout} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
              <svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path fill="white" d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>
              </svg>
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 mb-8 w-full flex justify-center">
        <div className="p-4 bg-white border border-gray-300 rounded">
          <p className="font-bold text-center">Made By:</p>
          <p className="text-center">Clarissa Audrey Fabiola Kusnadi</p>
          <p className="text-center">ID: 2602118490</p>
        </div>
      </div>
    </div>
  );
}
