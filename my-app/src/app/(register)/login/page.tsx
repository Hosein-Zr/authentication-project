"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface LoginData {
  username: string;
  email: string;
  password: string;
}

const loginUser = async (data: LoginData) => {
  const response = await axios.post("https://reqres.in/api/login", data);
  return response.data; 
};

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({mutationFn:
    loginUser}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4">
          {isSuccess && (
            <div className="text-green-500">
              Login successful! Token: {data.token}
            </div>
          )}
          {isError && (
            <div className="text-red-500">
              Error: {(error as any).response?.data?.error || "Unknown error"}
            </div>
          )}
        </div>
        <Link className=" text-xs text-sky-700 underline" href="/dashboard" >Directely in to the dashboard</Link>
      </div>
    </div>
  );
};

export default LoginComponent;
