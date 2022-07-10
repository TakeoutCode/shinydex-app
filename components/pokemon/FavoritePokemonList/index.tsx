import { FC, ReactNode } from 'react';
import { Grid, Card } from '@nextui-org/react'

interface Props {
  children: ReactNode
}

export const FavoritePokemonList: FC<Props> = ({children}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {children}
    </Grid.Container>
  )
}
