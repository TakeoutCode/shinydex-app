import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import { Grid } from '@nextui-org/react';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts"
import { Pokemon, PokemonMedium } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { PokemonListResponse } from '../../interfaces/pokemon-list';

import { PokemonSprites } from "../../components/pokemon/PokemonSprites";
import { PokemonStats } from "../../components/pokemon/PokemonStats";
import { PokemonTypes } from "../../components/pokemon/PokemonTypes";
import { PokemonMoves } from "../../components/pokemon/PokemonMoves";

interface Props {
  pokemon: PokemonMedium
}

const PokemonPageName: NextPage<Props> = ({pokemon}) => {
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
  const {data} = await pokeApi.get<PokemonListResponse>(`/pokemon/?limit=151`);
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);
  return {
    paths:  pokemonNames.map((name) => ({
      params: {name}
    })),  
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {name} = params as {name: string}
  const pokemon = await getPokemonInfo(name);
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
    }
  }
}

export default PokemonPageName
