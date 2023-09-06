import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image';
function Footer() {
  return (
    <div className={styles.container}>
    
    <div> ©2023  . All rights  reserved</div>
    
    <div className={styles.social}>
   <Image  src="/1.png" width={20} height={20} className={styles.icon} alt="lama dev facebook"/>
   <Image  src="/2.png" width={20} height={20} className={styles.icon} alt="lama dev instagram"/>
   <Image  src="/3.png" width={20} height={20} className={styles.icon} alt="lama dev twiter"/>
   <Image  src="/4.png" width={20} height={20} className={styles.icon} alt="lama dev youtube"/>
   
   </div>
    </div>
  )
}

export default Footer;