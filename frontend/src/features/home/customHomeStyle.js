import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CircleButton = styled(Button)({
  position: 'fixed',
  top: '10px',
  left: '60px',
  minWidth: '40px',
  width: '40px',
  height: '40px',
  boxShadow: 'none',
  lineHeight: 1.5,
  color: '#A3C653',
  backgroundColor: 'white',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#B9D279',
    color: 'white',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: '#B9D279',
    color: 'white',
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

