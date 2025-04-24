import styled from 'styled-components'
import { Box } from '@mui/material'

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-width: 90vw;
  background-color: #000317;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  padding: 32px;

  @media (max-width: 400px) {
    padding: 24px 16px;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`

export const ErrorText = styled.div`
  color: #f44336;       /* Color fijo */
  font-size: 0.875rem;
  margin-top: 4px;
`
