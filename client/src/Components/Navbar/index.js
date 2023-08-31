import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.css'
import { Button } from '@chakra-ui/react'


export default function Navigation() {

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className='logo'>
          <Link to="/">Logo</Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li><Link to={"/products"}>Products</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <Link to="/signin">
          <Button colorScheme='red'>Login</Button>
        </Link>
        <Link to="signup">
          <Button colorScheme='green'>Register</Button>
        </Link>
      </div>
    </div>

  )
}
