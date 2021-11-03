import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { AppBar, Dialog } from '@mui/material';
import Grid from '@mui/material/Grid'

export const FullDialogBar = styled(AppBar)({
  backgroundColor: '#A3C653',
  boxShadow: 'none'
})

export const FullDialogGrid = styled(Grid)({
  backgroundColor: '#D5E8A6',
  height: '100vh'
})

export const SliderInput = styled(Slider)({
  color: '#A3C653',
  width: '300px',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#B9D279',
    color: '#22220B',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export const SelectInput = styled(InputBase)(({ theme }) => ({
  fontSize: 16,
  borderRadius: 4,
  border: '3px solid #A3C653',
  lineHeight: 1.5,
  backgroundColor: 'white',
  color: '#22220B',
  width: '160px',
  height: '50px',
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&:hover': {
    borderColor: '#D5E8A6',
    borderWidth: 3,
  },
  '& .MuiInputBase-input': {
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}));

export const AddTextField = styled(TextField)({
  fontSize: 16,
  backgroundColor: 'white',
  color: '#22220B',
  width: '160px',
  height: '50px',
  '& label.Mui-focused': {
    color: '#22220B',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    borderWidth: 3,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#A3C653',
      borderWidth: 3,
    },
    '&:hover fieldset': {
      borderColor: '#D5E8A6',
      borderWidth: 3,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      orderWidth: 3,
    },
  },
});

export const AddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '3px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFF',
  borderColor: '#A3C653',
  color: '#22220B',
  width: '130px',
  height: '50px',
  '&:hover': {
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#22220B',
    boxShadow: 'none',
    fontWeight: 'bold',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#22220B',
    fontWeight: 'bold',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}); 

export const CancelButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '3px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFF',
  borderColor: '#7DA3D4',
  color: '#22220B',
  width: '130px',
  height: '50px',
  '&:hover': {
    backgroundColor: '#7DA3D4',
    borderColor: '#7DA3D4',
    color: '#FFFFF',
    boxShadow: 'none',
    fontWeight: 'bold',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#7DA3D4',
    borderColor: '#7DA3D4',
    color: '#FFFFF',
    fontWeight: 'bold',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const EditButton = styled(Button)({
  marginLeft: '5px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  borderRadius:'50%',
  padding: '6px 12px',
  border: '3px solid',
  lineHeight: 1.5,
  backgroundColor: '#D5E8A6',
  borderColor: '#D5E8A6',
  color: '#FFFFF',
  width: '30px',
  minWidth: '30px',
  height: '30px',
  '&:hover': {
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#22220B',
    boxShadow: 'none',
    fontWeight: 'bold',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#22220B',
    fontWeight: 'bold',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const SmallDarkButton = styled(Button)({
  margin: '0 10px 0 10px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 15,
  padding: '6px 12px',
  lineHeight: 1.5,
  color: '#22220B',
  height: '30px',
  borderRadius: 0,
  borderBottom: 'solid 2px #22220B',
  '&:hover': {
    backgroundColor: '#B9D279',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: '#B9D279',
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})