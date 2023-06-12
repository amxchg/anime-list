import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'

import { useTheme } from '@mui/material/styles'
import {
  Box, Container, CircularProgress, Grid, InputAdornment, OutlinedInput, Stack, Typography,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import StarIcon from '@mui/icons-material/Star'

import { getAnimes } from '../../lib/anime'
import AnimeCard from './components/AnimeCard'

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = debounce((newValue) => {
    setSearch(newValue);
  }, 1000)

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    }
  }, [])

  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [starsOnly, setStarsOnly] = useState(false)
  
  const theme = useTheme()

  const { data: favorites } = useQuery(['favorites'], () => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  const { data: stars } = useQuery(['stars'], () => {
    const stored = localStorage.getItem('stars')
    return stored ? JSON.parse(stored) : []
  })

  const {
    data: animes,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['animes'],
    queryFn: getAnimes,
    getNextPageParam: (lastPage, pages) => {
      return pages.length * 10
    },
  })

  return (
    <Container>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant='h3'>Anime List</Typography>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: 'center', paddingBottom: 3 }}>
        <Grid item xs={12} sm={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 200 }}>Filter</Typography>
            <StarIcon sx={{ color: starsOnly ? theme.palette.yellow.star : theme.palette.grey[200] }} onClick={() => setStarsOnly(!starsOnly)} />
            <FavoriteIcon sx={{ color: favoritesOnly ? theme.palette.red.favorite : theme.palette.grey[200] }} onClick={() => setFavoritesOnly(!favoritesOnly)} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8}>
          <OutlinedInput
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search anime..."
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlinedIcon stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
              </InputAdornment>
            }
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant='h4' sx={{ fontWeight: 200, textAlign: 'end' }}>{animes?.pages?.length * 10 || 0} Results</Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InfiniteScroll
          dataLength={animes?.pages?.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <Box sx={{ display: 'flex', p: 2, justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          }
        >
          <Grid container spacing={2} sx={{ margin: 'auto' }}>
            {animes?.pages?.map((anime) => anime?.data?.filter(x => favoritesOnly ? favorites.find(y => x.id === y) : x)
              .filter(x => starsOnly ? stars.find(y => x.id === y) : x)
              .filter(x => search.length > 0 ? x.attributes?.canonicalTitle.includes(search) : x)
              .map((anime, index) => <AnimeCard key={anime.id} anime={anime} /> ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </Container>
  )
}

export default Dashboard