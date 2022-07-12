import { Card, Grid, Text } from '@nextui-org/react';
import { FC } from "react"
import { PokemonMedium } from '../../../interfaces/';

import styles from './styles.module.scss';
interface Props {
  pokemon: PokemonMedium
}
export const PokemonMoves: FC<Props> = ({pokemon}) => {
  return (
    <Grid xs={12} sm={8} css={{overflow: 'hidden', maxHeight: "705.75px"}}>
      <Card>
        <Card.Header>
          <Text h2 transform="capitalize">moves</Text>
        </Card.Header>
        <Card.Body className={styles.card__body}>
            {pokemon.moves.map(pokemonMove => (
              <Grid key={pokemonMove} >
                <Text h4 transform="capitalize" css={{backgroundColor: "#0072F5", padding: "8px", borderRadius: "10px"}}>{pokemonMove}</Text>
              </Grid>
            ))}
          </Card.Body>
      </Card>
    </Grid>
  )
}
