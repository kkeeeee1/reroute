'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const NAV_ITEMS = [
  {label: 'Home', href: '/'},
  {label: 'B2B', href: '/b2b'},
  {label: 'B2C', href: '/b2c'},
  {label: 'About', href: '/about'},
  {label: 'Works', href: '/works'},
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-lg hover:text-black md:text-xl ${
              isActive ? 'font-extrabold text-black' : 'text-gray-600'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </header>
  )
}
