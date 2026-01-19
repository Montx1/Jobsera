'use client'

import { useParams, usePathname } from 'next/navigation'
import React, { use } from 'react'
import Logo from '../assets/bird_2.jpg'
import Image from 'next/image'
import links from '@/utils/links'
import { Button } from './ui/button'
import Link from 'next/link'
import Chatbot from './ChatBot'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='py-4 px-8 bg-muted h-full'>
      <div className="flex flex-col items-center">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            className="max-w-40"
          />
        </Link>

        <Link href="/">
          <h1 className="mt-2 text-xl font-semibold">
            Jobsera
          </h1>
        </Link>
      </div>
      <div className='flex flex-col mt-20 gap-y-4'>
        {links.map((link) => (
          <Button asChild key={link.href} variant={pathname === link.href ? 'default' : 'link'}>
            <Link href={link.href} className='flex items-center gap-x-2'>
              {link.icon} <span className='capitalize'>{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
      <Chatbot></Chatbot>
    </aside>
  )
}

export default Sidebar