"use client"
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react"; 

export default function WhatsAppFab() {
  const phoneNumber = "5553984797562"; 
  const preFilledMessage = "Olá! Gostaria de mais informações sobre os perfumes Atura."; 

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className=" fixed bottom-30 right-6 z-50"
      aria-label="Contate-nos pelo WhatsApp"
    >
      <Button
        size="icon"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
      >
        <MessageSquare size={28} /> 
        </Button>
    </a>
  );
}