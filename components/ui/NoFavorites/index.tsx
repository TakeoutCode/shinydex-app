import { Container, Text, Image } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
  return (
    <Container css={{
      display: 'flex',
      height: 'calc(100vh - 100px)',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }}>
      <Text h1>add some pokemon to favorites</Text>
        <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg" alt="Add pokemon" width={250} height={250} css={{opacity: 0.8}}/>
    </Container>
  )
}
