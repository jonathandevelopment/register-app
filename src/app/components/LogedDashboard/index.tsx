'use client'
import Image from "next/image";
import { createClient } from "../../../../utils/supabase/client"; 
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from "react";


export default function LogedDashboard({ user }: { user: User | null }) {

    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [name, setname] = useState<string | null>(null)
    const [lastname, setlastname] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
          setLoading(true) 
    
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`name, lastname, website, avatar_url`)
            .eq('id', user?.id)
            .single()
    
          if (error && status !== 406) {
            console.log(error)
            throw error
          }
    
          if (data) {
            setname(data.name)
            setlastname(data.lastname)
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
          }
        } catch (error) {
          console.warn('Error loading user data!')
        } finally {
          setLoading(false)
        }
      }, [user, supabase])
    
      useEffect(() => {
        getProfile()
      }, [user, getProfile])


    return (<>
        <h1 className=" text-5xl py-10">App de Reservas</h1>
        {user && (
            <h1 className=" text-5xl py-10">{`Bienvenido ${name}`} </h1>
        )  }
        
    </>)

}
