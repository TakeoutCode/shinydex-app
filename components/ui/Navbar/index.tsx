import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Button, Link, Text, useTheme } from '@nextui-org/react'
import styles from './styles.module.scss'

export const Navbar = () => {
  const { theme} = useTheme()
  return (
    <div 
      className={styles["navbar-container"]} 
      style={{backgroundColor: theme?.colors.gray100.value}}
    >
      
      <div>
        <Image src='/pokeball.png'
          alt="App Icon"
          width={35}
          height={35}
        />
        <NextLink href="/" passHref>
          <Link>
            <Text color='white' h2>S</Text>
            <Text color='white' h3>hiny Dex</Text>
          </Link>
        </NextLink>
      </div>
      
      <NextLink href="/favorites" passHref>
          <Link>
            <Text color='white' >Favoritos</Text>
          </Link>
      </NextLink>
    </div>
  )
}
