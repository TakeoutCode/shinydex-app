import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts/';
import { pokeApi } from '../api';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  
  return (
    <Layout title='Pokemon List'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={`Pokemon-${pokemon.id}`} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] =  data.results.map((pokemon, i) => ({
      ...pokemon,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i + 1}.png`,
  }))
  return {
    props: {
      pokemons
    }
  }
}
export default HomePage
