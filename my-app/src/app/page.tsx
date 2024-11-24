"use client"
import React, { useState } from "react";
import Test from "../components/test"
import Link from "next/link";
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Link href="/singup">Singup</Link>
    </div>
  );
};

export default App;
