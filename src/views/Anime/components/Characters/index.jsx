import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Grid, Typography } from '@mui/material'
import Character from "./components/Character"
import { getAnimeCharacters } from '../../../../lib/character'

const Characters = () => {
  const { id } = useParams()

  const { isLoading, data: characters, refetch } = useQuery(['characters'], () => getAnimeCharacters(id))

  useEffect(() => {
    refetch()
  }, [id])

  return (
    <Grid container spacing={1} sx={{ paddingBottom: 3 }}>
      <Grid item xs={12}>
        <Typography variant='h4'>Characters</Typography>
      </Grid>
      {!isLoading && (
        <Grid container spacing={2} sx={{ margin: 'auto' }}>
          {Object.values(characters)?.map((character) => (
            <Character key={character.id} id={character.id} />
          ))}
          {Object.values(characters)?.length <= 0 && (
            <Typography variant="body1" sx={{ p: 1}}>No Available Characters</Typography>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default Characters