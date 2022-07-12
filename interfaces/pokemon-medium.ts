import { Sprites, Stat, Type } from "./pokemon-full";

export interface PokemonMedium {
  name: string;
  id: number;
  sprites: Sprites;
  types: Type[];
  stats: Stat[];
  moves: string[];
}
