import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";

import { Card,  Grid, } from '@nextui-org/react';
import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { PokemonSprites } from "../../components/pokemon/PokemonSprites";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
  }, [pokemon.id]) 
  
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable css={{padding: '30px'}}>
            <Card.Body>
              <Card.Image src={pokemon.sprites.other?.home.front_shiny || 'noimage'} alt={pokemon.name}/>
            </Card.Body>
          </Card>
        </Grid>
        <PokemonSprites pokemon={pokemon} isInFavorites={isInFavorites} setIsInFavorites={setIsInFavorites} />
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
