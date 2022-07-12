import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import { Grid } from '@nextui-org/react';

import { Layout } from "../../components/layouts"
import { PokemonMedium } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { PokemonSprites } from "../../components/pokemon/PokemonSprites";
import { PokemonTypes } from "../../components/pokemon/PokemonTypes";
import { PokemonMoves } from "../../components/pokemon/PokemonMoves";
import { PokemonStats } from "../../components/pokemon/PokemonStats";

interface Props {
  pokemon: PokemonMedium;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
  }, [pokemon.id]) 
  
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <PokemonTypes pokemon={pokemon} />
        <PokemonSprites pokemon={pokemon} isInFavorites={isInFavorites} setIsInFavorites={setIsInFavorites} />
        <PokemonStats pokemon={pokemon} />
        <PokemonMoves pokemon={pokemon}/>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, i) => `${i + 1}`)
  return {
    paths:  pokemons151.map((id) => ({
      params: {id}
    })),  
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as {id: string}
  const pokemon = await getPokemonInfo(id)
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 86400
  }
}

export default PokemonPage
