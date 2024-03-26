"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";


export default async function Home() {
  
  
  const clases = ['lucha', 'jiujitsu brasileño', 'kickboxing'];
  const date = new Date();
  const currentDay = date.getDay();

  return (
    <>
      
      <main className=" flex min-h-screen flex-col items-center  p-24">
        <h1 className=" text-5xl py-10">App de Reservas</h1>
        {/* day classes */}

        <div>
          <div className=" text-5xl ">{`dia numero: ${currentDay}`}</div>
          <div className="flex flex-col gap-6">
            {clases.map((clase) => {
              return(
                <div 
                key={clase}
                className="py-4  bg-slate-200">{clase}</div>
              )
            })}
          </div>
        </div>
        
        
      </main>
    </>
    
  );
}
