"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  first_name?: string;
  last_name?: string;
  color?: string;
  pantone_value?: string;
  year?: number;
  avatar: string;
  id: number;
}

const fetchUserResource = async (id: number) => {
  const { data } = await axios.get(`https://reqres.in/api/{resource}/${id}`);
  return data;
};

const deleteUser = async (id: number) => {
  const response = await axios.delete(`https://reqres.in/api/users/${id}`);
  return response.data;
};

const deleteUserInfoField = async (id: number, field: string) => {
  const response = await axios.delete(`https://reqres.in/api/{resource}/${id}`, {
    data: { field },
  });
  return response.data;
};

const updateUser = async (id: number, updates: Record<string, any>) => {
  const response = await axios.patch(`https://reqres.in/api/{resource}/${id}`, updates);
  return response.data;
};

const UserProfileDetail: React.FC<ModalProps> = ({ isOpen, onClose, last_name, first_name, avatar, id }) => {
  const [editData, setEditData] = useState({
    name: "",
    color: "",
    year: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserResource(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      alert("User deleted successfully.");
      onClose();
    },
    onError: () => {
      alert("Failed to delete the user.");
    },
  });

  const deleteFieldMutation = useMutation({
    mutationFn: (field: string) => deleteUserInfoField(id, field),
    onSuccess: () => {
      alert("User information deleted successfully.");
    },
    onError: () => {
      alert("Failed to delete user information.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updates: Record<string, any>) => updateUser(id, updates),
    onSuccess: () => {
      alert("User information updated successfully.");
    },
    onError: () => {
      alert("Failed to update user information.");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    updateMutation.mutate(editData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`p-6 rounded-lg shadow-lg transform transition-all w-2/3 bg-sky-50 h-auto duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          ×
        </button>
        <div className="flex gap-x-4">
          <img src={avatar} alt="profile" className="w-24 h-24" />
          <div className="flex flex-col w-full gap-y-3">
            <p>
              {first_name} {last_name} {id}
            </p>
            <p className="w-full">{data.data.name}</p>
            <p className="w-full flex flex-row justify-between">
              {data.data.color}
              <button
                onClick={() => deleteFieldMutation.mutate("color")}
                className="bg-blue-500 text-white px-4 py-2 rounded w-32"
              >
                Delete Color
              </button>
            </p>
            <p className="w-full flex flex-row justify-between">
              {data.data.year}
              <button
                onClick={() => deleteFieldMutation.mutate("year")}
                className="bg-blue-500 text-white px-4 py-2 rounded w-32"
              >
                Delete Year
              </button>
            </p>
          </div>
        </div>

            <div className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Update Name"
                value={editData.name}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full mb-2"
              />
              <input
                type="text"
                name="color"
                placeholder="Update Color"
                value={editData.color}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full mb-2"
              />
              <input
                type="text"
                name="year"
                placeholder="Update Year"
                value={editData.year}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full mb-2"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Update Information
              </button>
            </div>
        <button
          onClick={() => deleteMutation.mutate()}
          className="bg-red-500 w-full text-white px-4 py-2 mt-4 rounded"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserProfileDetail;
