import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useTheme } from '@mui/material/styles'
import { ButtonBase, Grid, Stack, Typography } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

import { getEpisode } from '../../../../../../lib/episode'
import { addLog, deleteLog } from '../../../../../../lib/log'

const Episode = (props) => {
  const { id } = props

  const theme = useTheme()
  const queryClient = useQueryClient();

  const { data: episode } = useQuery(['episodes', { id: id }], () => getEpisode(id))

  // logs
  const { data: logs } = useQuery(['logs'], () => {
    const stored = localStorage.getItem('logs')
    return stored ? JSON.parse(stored) : []
  })

  const addLogMutation = useMutation((episodeId) => addLog(episode.id, logs), {
    onSuccess: (data) => queryClient.setQueryData(['logs'], [...logs, data]),
    onError: (e) => console.log(e),
  })

  const deleteLogMutation = useMutation((episodeId) => deleteLog(episode.id, logs), {
    onSuccess: (data) => queryClient.setQueryData(['logs'], (oldData) => oldData.filter((x) => x !== data)),
    onError: (e) => console.log(e),
  })

  const toggleLog = () => {
    logs?.find(x => x === episode.id) ? deleteLogMutation.mutate(episode.id) : addLogMutation.mutate(episode.id)
  }
  return (
    <Grid key={episode?.id} item xs={12}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <ButtonBase onClick={() => toggleLog()}>
          <CheckOutlinedIcon size='inherit' sx={{ color: logs?.find(x => x === episode?.id) ? theme.palette.green.check : theme.palette.grey[300] }} />
        </ButtonBase>
        <Typography variant="body1">
          {episode?.attributes?.airdate}
        </Typography>
        <Typography variant="body1">
          {episode?.attributes?.number || '-'}:
        </Typography>
        <Typography variant="body1">
          {episode?.attributes?.canonicalTitle || '-'}
        </Typography>
      </Stack>
    </Grid>
  )
}

export default Episode