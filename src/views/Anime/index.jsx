import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { getAnime } from '../../lib/anime'

import { Container, Box, Grid, Stack, Typography, ButtonBase } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import Attributes from './components/Attributes'
import Characters from './components/Characters'
import Episodes from './components/Episodes'

const Anime = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: anime } = useQuery(['animes', { id: id }], () => getAnime(id))

  return (
    <Container>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant='h3'>{anime?.attributes?.canonicalTitle}</Typography>
      </Box>
      <Box sx={{ paddingBottom: 3 }}>
        <ButtonBase onClick={() => navigate(-1)}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <ArrowBackIosNewOutlinedIcon fontSize="inherit"/>
            <Typography variant='h4' sx={{ fontWeight: 200 }}>Back</Typography>
          </Stack>
        </ButtonBase>
      </Box>
      <Grid container spacing={[2, 4]}>
        <Grid item xs={12} md={4}>
          <Attributes anime={anime?.attributes} animeId={anime?.id} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="column" spacing={1} sx={{ alignItems: 'center', paddingBottom: 3 }}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>{anime?.attributes?.synopsis}</Typography>
          </Stack>
          <Characters />
          <Episodes />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Anime