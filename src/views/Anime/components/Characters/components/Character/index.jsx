import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { getAnimeCharacter } from '../../../../../../lib/character'

const Character = (props) => {
  const { id } = props

  const { data: character } = useQuery(['characters', { id: id }], () => getAnimeCharacter(id))

  return (
    <Grid key={character?.id} item xs={4} sm={3} md={3}>
      <Card variant="outlined" sx={{ '& .MuiCardContent-root': { p: 1 }, position: 'relative' }}>
        <Link to={`/character/${character?.id}`}>
          <CardMedia sx={{ height: [100, 165] }} image={character?.attributes?.image?.original} />
        </Link>
        <CardContent as="div" sx={{ background: 'rgba(255,255,255,0.75)', position: 'absolute', bottom: 0, width: '100%' }}>
          <Typography variant="h5" width={[75, 135, 110, '100%']} noWrap sx={{ p: 0 }}>
            {character?.attributes?.canonicalName}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Character