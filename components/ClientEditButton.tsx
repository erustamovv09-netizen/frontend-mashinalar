"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientEditButton({ carId }: { carId: number }) {
  const [canEdit, setCanEdit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const router = useRouter();

  useEffect(() => {
    const checkEditStatus = () => {
      const myCars = JSON.parse(localStorage.getItem("my_cars") || "{}");
      const carData = myCars[carId];

      if (carData) {
        const now = new Date().getTime();
        // Necha daqiqa o'tganini hisoblaymiz
        const diffMinutes = Math.floor((now - carData.created_at) / (1000 * 60));

        if (diffMinutes < 15) {
          setCanEdit(true);
          setTimeLeft(15 - diffMinutes);
        } else {
          setCanEdit(false);
        }
      }
    };

    checkEditStatus();
    
    // Har 1 daqiqada vaqtni yangilab turamiz
    const interval = setInterval(checkEditStatus, 60000);
    return () => clearInterval(interval);
  }, [carId]);

  // Agar vaqt o'tgan bo'lsa yoki mashina uniki bo'lmasa, tugma umuman ko'rinmaydi
  if (!canEdit) return null;

  return (
    <Button
      onClick={() => router.push(`/cars/${carId}/edit`)}
      variant="outline"
      className="w-full h-12 md:h-14 mt-3 rounded-2xl border-blue-200 bg-blue-50 hover:!bg-blue-600 hover:!text-white text-blue-600 transition-all active:scale-95 italic uppercase text-[9px] md:text-[10px] font-black gap-2 cursor-pointer group"
    >
      <Pencil className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
      Tahrirlash uchun ({timeLeft} daqiqa qoldi)
    </Button>
  );
}