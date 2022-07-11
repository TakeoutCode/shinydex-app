import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrdId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrdId}`);
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      stats: data.stats,
    };
  } catch (error) {
    return null;
  }
};
