import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrdId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrdId}`);
    const moves = data.moves.map((move) => move.move.name);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      stats: data.stats,
      types: data.types,
      moves,
    };
  } catch (error) {
    return null;
  }
};
