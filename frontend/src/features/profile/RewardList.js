import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Button } from '@mui/material';
import { requestDeleteChildReward } from '../../app/actions/userActions'
import { useDispatch } from 'react-redux';

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const MList = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});


export default function RewardList(props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()
  const onDeleteReward = (cid, e) => {
    // console.log(cid)
    // cid를 지우면 됨
    dispatch(requestDeleteChildReward(cid))
      .then(res=>{
        // console.log(res)
        // 보상 지우고 보상 목록 갱신하기 위해 부모 함수 호출
        props.refresh()
      })
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
        <Paper elevation={0} sx={{ maxWidth: '90%' }}>
          <MList component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="보상 목록"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {open &&
                props.rewards.map((item) => (
                  <ListItemButton
                    key={item.cid}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <FavoriteRoundedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                    <Button onClick={(e)=>{ onDeleteReward(item.cid, e) }}>완료</Button>
                  </ListItemButton>
                ))}
            </Box>
          </MList>
        </Paper>
    </Box>
  );
}