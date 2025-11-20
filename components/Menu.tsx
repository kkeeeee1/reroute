'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {motion, AnimatePresence} from 'framer-motion'

const NAV_ITEMS = [
  {label: 'About', href: '/about'},
  {label: 'B2B', href: '/b2b'},
  {label: 'B2C', href: '/b2c'},
  {label: 'Works', href: '/works'},
]

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export function Menu({isOpen, onClose}: MenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3, ease: 'easeInOut'}}
          className="fixed inset-0 z-40 flex h-screen w-screen flex-col bg-navy"
        >
          <div className="mx-auto flex h-full w-full max-w-screen-max flex-col justify-center px-5 pt-5 md:px-10 lg:px-20 md:pt-10 lg:pt-20">
            <nav className="flex h-full flex-col justify-center gap-6 md:gap-8 lg:gap-[40px]">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative w-fit text-[48px] font-bold leading-none text-white md:text-[80px] lg:text-[120px]"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#5161B1] transition-all duration-300 ease-out group-hover:w-full ${isActive ? 'w-full' : ''}`}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
