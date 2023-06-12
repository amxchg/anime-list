import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Grid, Typography } from '@mui/material'
import Episode from "./components/Episode"
import { getEpisodes } from '../../../../lib/episode'

const Episodes = () => {
  const { id } = useParams()

  const { isLoading, data: episodes, refetch } = useQuery(['episodes'], () => getEpisodes(id))

  useEffect(() => {
    refetch()
  }, [id])

  return (
    <Grid container spacing={1} sx={{ paddingBottom: 3 }}>
      <Grid item xs={12}>
        <Typography variant='h4'>Episodes</Typography>
      </Grid>
      {!isLoading && (
        <Grid container spacing={2} sx={{ margin: 'auto' }}>
          {Object.values(episodes)?.map((episode) => (
            <Episode key={episode.id} id={episode.id} />
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default Episodes