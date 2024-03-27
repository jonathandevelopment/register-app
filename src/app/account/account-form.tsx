'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../../../utils/supabase/client' 
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'

export default function AccountForm({ user }: { user: User | null }) {
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
      alert('Error loading user data from Account form!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    lastname,
    website,
    avatar_url,
  }: {
    lastname: string | null
    name: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        name: name,
        lastname,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg p-8 bg-gray-300 shadow-lg rounded-lg my-10">
    <div className="text-center mb-8">
        <Avatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
                setAvatarUrl(url)
                updateProfile({ name, lastname, website, avatar_url: url })
            }}
        />
    </div>
    <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="text" value={user?.email} disabled className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
    </div>
    <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
            id="name"
            type="text"
            value={name || ''}
            onChange={(e) => setname(e.target.value)}
            className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
            id="lastname"
            type="text"
            value={lastname || ''}
            onChange={(e) => setlastname(e.target.value)}
            className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
    </div>

    <div className="text-center">
        <button
            className="button primary w-full"
            onClick={() => updateProfile({ name, lastname, website, avatar_url })}
            disabled={loading}
        >
            {loading ? 'Loading ...' : 'Update'}
        </button>
    </div>

    <div className="text-center mt-4">
        <form action="/auth/signout" method="post">
            <button className="button w-full" type="submit">
                Sign out
            </button>
        </form>
    </div>
</div>


  )
}