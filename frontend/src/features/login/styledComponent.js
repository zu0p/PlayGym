
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion"
import cloudImage from '../../images/background_cloud.png'

export const SubmitButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '3px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFFF',
  borderColor: '#A3C653',
  color: '#22220B',
  width: '300px',
  height: '50px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#FFFFFF',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#A3C653',
    borderColor: '#A3C653',
    color: '#FFFFFF',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const LoginTextField = styled(TextField)({
  fontSize: 16,
  backgroundColor: 'white',
  color: '#22220B',
  width: '300px',
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
      borderColor: 'white',
      borderWidth: 3,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      borderWidth: 3,
    },
  },
});

export const BackAnimation = styled(motion.div)({
  width: '200px',
  height: '200px',
})

export const SmallButton = styled(Button)({
  margin: '0 10px 0 10px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 15,
  padding: '6px 12px',
  lineHeight: 1.5,
  color: '#A3C653',
  height: '30px',
  borderRadius: 0,
  borderBottom: 'solid 2px #A3C653',
  '&:hover': {
    color: '#22220B',
    boxShadow: 'none',
  },
  '&:active': {
    color: '#22220B',
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})