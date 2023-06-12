import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useTheme } from '@mui/material/styles'
import { ButtonBase, Card, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'

import { addFavorite, deleteFavorite } from '../../../../lib/favorite'
import { addStar, deleteStar } from '../../../../lib/star'

const Attributes = (props) => {
  const { anime, animeId } = props

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
    favorites?.find(x => x === animeId) ? deleteFavoriteMutation.mutate(animeId) : addFavoriteMutation.mutate(animeId)
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
    stars?.find(x => x === animeId) ? deleteStarMutation.mutate(animeId) : addStarMutation.mutate(animeId)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <CardMedia sx={{ height: 400 }} image={anime?.posterImage?.original || anime?.coverImage?.original} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <ButtonBase onClick={() => toggleStar()}>
            {stars?.find(x => x === animeId) ? <StarIcon sx={{ color: theme.palette.yellow.star }} /> : <StarOutlineOutlinedIcon />}
          </ButtonBase>
          <Typography>{anime?.averageRating} from {anime?.userCount || 0} users</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <ButtonBase onClick={() => toggleFavorite()}>
            {favorites?.find(x => x === animeId) ? <FavoriteIcon sx={{ color: theme.palette.red.favorite }} /> : <FavoriteBorderOutlinedIcon />}
          </ButtonBase>
          <Typography>{anime?.favoritesCount}</Typography>
          <Chip label={`Rank #${anime?.ratingRank}`} />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <Typography>Rated {anime?.aveRating}: </Typography>
          <Typography>{anime?.ageRatingGuide}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <Typography>Aired on {anime?.startDate}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <Typography>{anime?.status === 'finished' ? `Ended on ${anime?.endDate}` : 'Ongoing'}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', paddingBottom: 1 }}>
          <Typography>Type: {anime?.showType?.charAt(0).toUpperCase()}{anime?.showType?.slice(1)}</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Attributes