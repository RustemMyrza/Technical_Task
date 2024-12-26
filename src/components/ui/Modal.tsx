// src/components/ui/modal.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function Modal({ isOpen, onClose, onConfirm, title, message }: ModalProps) {
  if (!isOpen) return null; // Если модальное окно не открыто, не рендерим его

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={onClose}>Отмена</Button>
          <Button variant="destructive" onClick={onConfirm}>Удалить</Button>
        </div>
      </div>
    </div>
  );
}
