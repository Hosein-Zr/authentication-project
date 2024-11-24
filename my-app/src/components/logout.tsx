"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const logoutUser = async () => {
  const response = await axios.post("https://reqres.in/api/logout");
  return response.data; 
};

const LogoutButton: React.FC = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logoutUser, 
    onSuccess: () => {
      alert("You have been logged out successfully.");
      window.location.href = "/login"; 
    },
    onError: () => {
      alert("Failed to log out. Please try again.");
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isLoading}
      className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
