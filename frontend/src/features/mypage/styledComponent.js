import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Backward = styled(ArrowBackIosNewIcon)({
  color: '#A3C653',
  cursor: 'pointer',
  '&:hover': {
    color: '#000',
  },
})

export const Forward = styled(ArrowForwardIosIcon)({
  color: '#A3C653',
  cursor: 'pointer',
  '&:hover': {
    color: '#000',
  },
})