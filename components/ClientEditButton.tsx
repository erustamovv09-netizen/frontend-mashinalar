"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientEditButton({ carId }: { carId: number }) {
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const myCars = JSON.parse(localStorage.getItem("myCars") || "[]");
      const found = myCars.find((c: any) => c.id === carId);

      if (found) {
        const now = new Date().getTime();
        const diff = (now - found.time) / 1000 / 60; // minutda
        if (diff < 15) {
          setCanEdit(true);
        } else {
          setCanEdit(false);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Har 30 sekunda tekshirib turadi
    return () => clearInterval(interval);
  }, [carId]);

  if (!canEdit) return null;

  return (
    <div className="flex gap-2 mt-2">
      <Link href={`/maxfiy-admin/edit/${carId}`} className="text-blue-600 border p-1 rounded text-xs">
        Tahrirlash
      </Link>
    </div>
  );
}