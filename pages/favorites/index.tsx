import { Grid, Card } from '@nextui-org/react';
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts"
import { FavoritePokemon } from '../../components/pokemon/FavoritePokemon';
import { FavoritePokemonList } from '../../components/pokemon/FavoritePokemonList';
import { NoFavorites } from '../../components/ui/NoFavorites/';
import { localFavorites } from "../../utils";

const Favorites = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  },[])

  return (
    <Layout title="Pokemons - Favorites">

      {favoritesPokemons.length === 0 ? (<NoFavorites />):(
        <FavoritePokemonList>
          {favoritesPokemons.map(pokemonId => (
            <FavoritePokemon key={pokemonId} pokemonId={pokemonId} />
          ))}
        </FavoritePokemonList>
      )}
      
    </Layout>
  )
}

export default Favorites