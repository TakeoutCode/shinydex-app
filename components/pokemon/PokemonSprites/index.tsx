import { FC } from 'react';
import Image from 'next/image'

import { Grid, Card, Button, Container, Text } from '@nextui-org/react'
import confetti from "canvas-confetti";

import styles from './styles.module.scss'
import { localFavorites } from '../../../utils';
import { Pokemon } from '../../../interfaces';

interface Props {
  pokemon: Pokemon;
  isInFavorites: boolean;
  setIsInFavorites: (isInFavorites: boolean) => void;
}

export const PokemonSprites: FC<Props> = ({pokemon,isInFavorites, setIsInFavorites}) => {
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
      confetti({
        zIndex: 1,
        particleCount: 100,
        spread: 160,
        angle: 0,
        origin: { x: 0, y: 0,   },
      })
    }
  }

  return (
    <Grid xs={12} sm={8}>
          <Card>
            <Card.Header className={styles.card__header}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button color="gradient" ghost={isInFavorites} onClick={onToggleFavorite}>{isInFavorites ? "remove from favorites" : "Save to favorites"  }</Button>
             
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" justify="space-around" alignItems="center" gap={0}>
                <Image 
                  src={pokemon.sprites.front_default} 
                  alt="Default Image" 
                  width={120} 
                  height={120} 
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
                  width={120} 
                  height={120} 
                />
                <Image 
                  src={pokemon.sprites.other?.home.front_default || "efewf"} 
                  alt="Default Image" 
                  width={120} 
                  height={120} 
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
  )
}
