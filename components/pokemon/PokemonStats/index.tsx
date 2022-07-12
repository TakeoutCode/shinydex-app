import { FC } from 'react';
import { Card, Text, Grid, Progress } from '@nextui-org/react';
import { Pokemon, PokemonMedium } from '../../../interfaces';

interface Props {
  pokemon: PokemonMedium;
}
export const PokemonStats: FC<Props> = ({pokemon}) => {
  return (
    <Grid xs={12} sm={4}>
      <Card>
        <Card.Header>
          <Text h2 transform="capitalize">stats</Text>
        </Card.Header>
        <Card.Body>
          <Grid.Container xs={12} gap={2} >
            {pokemon.stats.map(pokemonStat => (
              <Grid key={pokemonStat.stat.name} xs={12} css={{display: "flex", flexDirection: "column"}}>
                <Grid css={{display: "flex", justifyContent: "space-between"}}>
                  <Text h4 transform='capitalize'>{pokemonStat.stat.name}</Text>
                  <Text>{pokemonStat.base_stat}</Text>
                </Grid>
                <Progress 
                  value={ (pokemonStat.base_stat * 100) / 150 } 
                  color="secondary" 
                  status="secondary"
                />
              </Grid>
            ))}
          </Grid.Container>
        </Card.Body>
      </Card>
    </Grid>
   
  )
}
