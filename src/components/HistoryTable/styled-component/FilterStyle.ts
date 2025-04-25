import { FormControl,Select,MenuItem, styled } from "@mui/material";


export const StyledFormControl=styled(FormControl)(()=>({
    minWidth:200,
}));

export const StyledSelect = styled(Select)<{ value?: unknown }>(() => ({
    backgroundColor: "#f8f9fa", 
    borderRadius: 8,
    '& fieldset':{
        borderColor:'#6c757d'
    },
    '&:hover fieldset':{
        borderColor:'#007bff',
    },
    '&.Mui-focused fieldset':{
        borderColor:'#007bff'
    }
  }));
  

export const StyledMenuItem=styled(MenuItem)(()=>({
    '&:hover':{
        backgroundColor:'#007bff',
        color:'white',
    },
}));