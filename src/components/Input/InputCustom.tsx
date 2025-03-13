import React from 'react'
import { InputCustomProps } from '../../models/InputCustom.model'
import { CustomTextField } from './styled-component/InputCustom.style'
const InputCustom: React.FC<InputCustomProps> = ({
  label,
  name,
  type='text',
  value,
  onChange,
  fullWidth=false,
  InputLabelProps,
  error,
  helperText,
}) => {
  return (
    <CustomTextField
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    error={error}
    helperText={helperText}
    variant='outlined'
    InputLabelProps={InputLabelProps?{shrink:true}:undefined}
    />
  )
}

export default InputCustom