import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.css'
import { Button } from '@chakra-ui/react'
import { useAuth } from '../../Contexts/AuthContext'
import { useBasket } from '../../Contexts/BasketContext'


export default function Navigation() {
  const { loggedIn, user } = useAuth()
  const { items } = useBasket();
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className='logo'>
          <Link to="/" className={styles.logo}>Logo</Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li><Link to={"/"}>Products</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        {
          !loggedIn && (<>
            <Link to="/signin">
              <Button colorScheme='red'>Login</Button>
            </Link>
            <Link to="signup">
              <Button colorScheme='green'>Register</Button>
            </Link>
          </>)
        }
        {
          loggedIn && (<>
            {
              items.length > 0 && (
                <Link to="/basket">
                  <Button colorScheme='yellow' variant={"outline"}>
                    Basket ({items.length})
                  </Button>
                </Link>
              )
            }
            <Link to="/profile">
              <Button colorScheme='yellow'>{user.email}</Button>
            </Link>
          </>)
        }
      </div>
    </div>

  )
}
