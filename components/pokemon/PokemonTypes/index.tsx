import { FC } from 'react'
import { Card, Grid, Text } from '@nextui-org/react'
import { PokemonMedium } from '../../../interfaces';

interface Props {
  pokemon: PokemonMedium;
}

export const PokemonTypes: FC<Props> = ({pokemon}) => {
  return (
  <Grid xs={12} sm={4} >
    <Card isHoverable css={{padding: '30px'}}>
      <Card.Body>
        <Card.Image src={pokemon.sprites.other?.home.front_shiny || 'noimage'} alt={pokemon.name}/>
        <Text h2 css={{textAlign: "center", marginTop: "20PX"}} transform="capitalize" >{pokemon.types[0].type.name} {pokemon.types[1] ? ` / ${pokemon.types[1].type.name}` : ""}</Text>
      </Card.Body>
    </Card>
  </Grid>
  )
}
