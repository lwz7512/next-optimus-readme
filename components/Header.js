
import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import meta from '../meta.json'



// const NavLink = ({ children, href }) => {
//   const child = React.Children.only(children);
//   const router = useRouter();
  
//   return (
//     <Link href={href}>
//       {React.cloneElement(child, {
//         "aria-current": router.asPath === href ? "page" : null
//       })}
//     </Link>
//   );
// };



export default function Header() {

  const router = useRouter()

  const scrollHandler = () => {
    const distance = document.documentElement.scrollTop
    if(distance > 210) {
      document.querySelector('.trans-background').classList.add('solid')
    }else{
      document.querySelector('.trans-background').classList.remove('solid')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)

  }, [])


  return (
    <header className="fixed-header">
      <div className="trans-background"/>
      <div className="d-flex flex-justify-between px-3">
        <Link href="/">
          <a className="logo-link">
            <img src={meta.logo} className="logo" />
          </a>
        </Link>
        <nav className="menu-nav">
          <ul className="hori-list">
            {
              meta.menu.map(m => (
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
      </div>
    </header>
  )
}