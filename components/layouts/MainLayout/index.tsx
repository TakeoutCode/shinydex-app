import { FC, ReactNode } from 'react';

import Head from 'next/head';

import { Navbar } from '../../ui/Navbar';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  title?: string;
}

const origin = typeof window !== 'undefined' ? window.location.origin : '';

export const Layout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Braulio Quezada"/>
        <meta name="description" content={`${title} Pokemon Info`}/>
        <meta name="keywords" content={`${title}, pokemon, pokedex`}/>

        <meta property="og:title" content={`Information about ${title}`} />
        <meta property="og:description" content={`This is the page about ${title}`} />
        <meta property="og:url" content={origin} />
        <meta property="og:image" content={`${origin}/bannerPokemon.png`} />
      </Head> 

        <Navbar/>

        <main className={styles['main-container']}>
          {children}
        </main>
    </>
  )
}
