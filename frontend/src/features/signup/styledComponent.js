import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

export const SignupTextField = styled(TextField)({
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


export const CheckButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 6px',
  border: '3px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFFF',
  borderColor: '#A3C653',
  color: '#22220B',
  marginLeft: '10px',
  marginTop: '5px',
  width: '90px',
  height: '57px',
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
