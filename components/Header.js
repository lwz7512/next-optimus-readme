
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import meta from '../meta.json'
import { RiMenuFill, RiCloseFill } from 'react-icons/ri'


export default function Header() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const scrollHandler = () => {
      const distance = document.documentElement.scrollTop
      if(distance > 210) {
        document.querySelector('.trans-background').classList.add('solid')
      }else{
        document.querySelector('.trans-background').classList.remove('solid')
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])


  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setOpen(false)
      document.querySelector('.mobile-menu').classList.remove('active')
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const openMenulist = () => {
    document.querySelector('.mobile-menu').classList.toggle('active')
    setOpen(!open)
  }

  const realMenu = JSON.parse(process.env.NEXT_PUBLIC_MENU) || meta.menu


  return (
    <header className="fixed-header">
      {/* hori header bar */}
      <div className="d-flex flex-justify-between px-3 trans-background">
        <Link href="/">
          <a className="logo-link">
            <img src={meta.logo} className="logo" />
          </a>
        </Link>
        {/* navigation menu */}
        <nav className="menu-nav">
          <ul className="hori-list">
            {
              realMenu.map(m => (
                <li 
                  key={m.name}
                  className={`menu-item ${router.asPath === m.slug ? 'active': ''}`}>
                  <Link href={m.slug}>
                    <a>{m.name}</a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
        {/* mobile menu opner */}
        <div className="mobile-nav">
          <button type="button" onClick={openMenulist}>
            {!open && <RiMenuFill style={{width:24, height:24}} />}
            {open && <RiCloseFill style={{width:24, height:24}} />}
          </button>
        </div>
      </div>
      {/* mobile menu under header bar with full width */}
      <ul className="mobile-menu">
        {
          realMenu.map(m => (
            <li key={m.name}>
              <Link href={m.slug}>
                <a>{m.name}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </header>
  )
}