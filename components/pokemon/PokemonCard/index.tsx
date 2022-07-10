import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from "react"
import { SmallPokemon } from '../../../interfaces';

interface Props {
  pokemon: SmallPokemon
}

export const PokemonCard:FC<Props> = ({pokemon}) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/name/${pokemon.name}`)
  }
  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card 
        isPressable 
        isHoverable
        onClick={handleClick}
      >
        <Card.Body>
          <Card.Image src={pokemon.img} width="100%" height={100}/>
          <Card.Footer>
            <Row justify="space-between">
              <Text transform='capitalize'>{pokemon.name}</Text>
              <Text>#{pokemon.id}</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  )
}
