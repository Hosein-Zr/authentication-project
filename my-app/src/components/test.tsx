"use client"
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const SimpleModal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ${
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
        <div>{content}</div>
      </div>
    </div>
  );
};

export default SimpleModal;
