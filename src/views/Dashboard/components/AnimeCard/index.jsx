import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useTheme } from '@mui/material/styles'
import {
  ButtonBase, Grid, Stack, Typography, Card, CardMedia, CardContent,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'

import { addFavorite, deleteFavorite } from '../../../../lib/favorite'
import { addStar, deleteStar } from '../../../../lib/star'

const AnimeCard = (props) => {
  const { anime } = props

  const theme = useTheme()
  const queryClient = useQueryClient();

  // favorites
  const { data: favorites } = useQuery(['favorites'], () => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  const addFavoriteMutation = useMutation((animeId) => addFavorite(animeId, favorites), {
    onSuccess: (data) => queryClient.setQueryData(['favorites'], [...favorites, data]),
    onError: (e) => console.log(e),
  })

  const deleteFavoriteMutation = useMutation((animeId) => deleteFavorite(animeId, favorites), {
    onSuccess: (data) => queryClient.setQueryData(['favorites'], (oldData) => oldData.filter((x) => x !== data)),
    onError: (e) => console.log(e),
  })

  const toggleFavorite = () => {
    favorites?.find(x => x === anime.id) ? deleteFavoriteMutation.mutate(anime.id) : addFavoriteMutation.mutate(anime.id)
  }

  // stars
  const { data: stars } = useQuery(['stars'], () => {
    const stored = localStorage.getItem('stars')
    return stored ? JSON.parse(stored) : []
  })

  const addStarMutation = useMutation((animeId) => addStar(animeId, stars), {
    onSuccess: (data) => queryClient.setQueryData(['stars'], [...stars, data]),
    onError: (e) => console.log(e),
  })

  const deleteStarMutation = useMutation((animeId) => deleteStar(animeId, stars), {
    onSuccess: (data) => queryClient.setQueryData(['stars'], (oldData) => oldData.filter((x) => x !== data)),
    onError: (e) => console.log(e),
  })

  const toggleStar = () => {
    stars?.find(x => x === anime.id) ? deleteStarMutation.mutate(anime.id) : addStarMutation.mutate(anime.id)
  }

  return (
    <Grid key={anime.id} item xs={12} sm={6} md={4} lg="auto" sx={{ minWidth: ['100%', 270], maxWidth: [340, '100%'] }}>
      <Card variant="outlined" sx={{ '& .MuiCardContent-root': { p: 2 }, position: 'relative' }}>
        <Link to={`/anime/${anime.id}`}>
          <CardMedia sx={{ height: 200 }} image={anime.attributes.coverImage?.original || anime.attributes.posterImage?.original} />
        </Link>
        <CardContent as="div" sx={{ background: 'rgba(255,255,255,0.75)', position: 'absolute', bottom: 0, width: '100%' }}>
          <Typography variant="h5" width={230} noWrap>
            {anime.attributes.canonicalTitle}
          </Typography>
          <Stack direction="row" spacing={1}>
            <ButtonBase onClick={() => toggleStar()}>
              <StarIcon sx={{ color: stars?.find(x => x === anime.id) ? theme.palette.yellow.star : theme.palette.grey[500] }} />
              <Typography>{anime.attributes.averageRating}</Typography>
            </ButtonBase>
            <ButtonBase onClick={() => toggleFavorite()}>
              <FavoriteIcon sx={{ color: favorites?.find(x => x === anime.id) ? theme.palette.red.favorite : theme.palette.grey[500] }} />
              <Typography>{anime.attributes.favoritesCount}</Typography>
            </ButtonBase>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default AnimeCard
