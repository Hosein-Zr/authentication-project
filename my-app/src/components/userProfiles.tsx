"use client";
import React, { useState } from "react";
import {  useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setSelectedUserId } from "../store/slice/userSlice";
import UserProfileDetail from "./userProfileDetail";
import LogoutButton from "./logout";


const fetchData = async (page: number, perPage: number) => {
  const response = await fetch(
    `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};



const UserProfileAvatar = () => {
  const dispatch = useDispatch();
  const handleUserClick = (userId: number) => {
    dispatch(setSelectedUserId(userId));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["data", page, perPage], 
    queryFn: () => fetchData(page, perPage),
  });

 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Data</h1>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span>Page: {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
        <input
          type="number"
          min="1"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded"
        />
        <span>Items per page</span>
        

      <LogoutButton />
        
      </div>

      <ul className=" flex flex-wrap items-center justify-center">
        {data.data.map((item) => (
          <li
            onClick={() => {
              toggleModal();
              setUserId(item.id)
              console.log(userId)
              handleUserClick(item.id);
            }}
            key={item.id}
            className="p-4 m-6 w-52 h-auto border rounded shadow flex flex-col items-center gap-y-4 hover:bg-gray-100"
          >
            <img
              src={item.avatar}
              className=" object-cover rounded-full w-28 h-28"
              alt="profile"
            />
            
            <p className="font-bold">
              {" "}
              {item.first_name} {item.last_name}
            </p>
            
            {item.id === userId && 
            <UserProfileDetail
              isOpen={isModalOpen}
              onClose={toggleModal}
              first_name={item.first_name}
              id={item.id}
              last_name={item.last_name}
              avatar={item.avatar}
              />
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileAvatar;
