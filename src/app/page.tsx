
import Image from "next/image";
import Navbar from "./components/Navbar";
import { createClient } from "../../utils/supabase/server"; 
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from "react";
import LogedDashboard from "./components/LogedDashboard";


export default async function Home() {

  const supabase = createClient()
 
  const {
    data: { user },
  } = await supabase.auth.getUser()

  
  
  const clases = ['lucha', 'jiujitsu brasileño', 'kickboxing'];
  const date = new Date();
  const currentDay = date.getDay();

  return (
    <>
      
      <main className=" flex min-h-screen flex-col items-center  p-24">
        
      <LogedDashboard user={user}/>

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
