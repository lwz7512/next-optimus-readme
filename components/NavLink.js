import React from 'react'
import { useRouter } from "next/router"

const NavLink = ({ children, href }) => {
  const child = React.Children.only(children);
  const router = useRouter();
  
  return (
    <Link href={href}>
      {React.cloneElement(child, {
        "aria-current": router.asPath === href ? "page" : null
      })}
    </Link>
  );
};

export default NavLink