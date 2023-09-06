import React from 'react'
import styles from './Navbar.module.css';
import Link from 'next/link';
import DarkModeToggle from '../darkModeToggle/DarkModeToggle';

const Navbar = () => {

    const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Birth",
    url: "/birth",
  },
  {
    id: 3,
    title: "Death",
    url: "/death",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },

];
  return (
    <div className={styles.container}>
    <Link href={'/'} className={styles.logo}>Birth and Death Registration</Link>
     <div className={styles.links}>
     <DarkModeToggle />
    {

        links.map((link)=>{
        return(
            <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
        )
        })
    }

     </div>


    </div>
  )
}

export default Navbar