import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";

import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
  }, [pokemon.id]) 

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (!isInFavorites) {
      confetti({
        zIndex: 1,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: { x: 1, y: 0 },
      })
    }
  }

  
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
        <Grid xs={12} sm={8} >
          <Card>
            <Card.Header css={{display: 'flex', justifyContent: "space-between"}}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button color="gradient" ghost={isInFavorites} onClick={onToggleFavorite}>{isInFavorites ? "remove from favorites" : "Save to favorites"  }</Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" justify="space-around" alignItems="center" gap={0}>
                <Image 
                  src={pokemon.sprites.front_default} 
                  alt="Default Image" 
                  width={100} 
                  height={100} 
                />
                <Image 
                  src={pokemon.sprites.other?.dream_world.front_default || "ndf"} 
                  alt="Default Image" 
                  width={120} 
                  height={120} 
                />
                <Image 
                  src={pokemon.sprites.other?.["official-artwork"].front_default || "efewf"} 
                  alt="Default Image" 
                  width={150} 
                  height={150} 
                />
                <Image 
                  src={pokemon.sprites.other?.home.front_default || "efewf"} 
                  alt="Default Image" 
                  width={150} 
                  height={150} 
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
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
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as {id: string}

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    }
  }
}

export default PokemonPage
