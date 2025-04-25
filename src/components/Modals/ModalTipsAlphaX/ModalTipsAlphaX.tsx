import React from "react";
import { Modal, Typography, Box, CardContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TipsModalProps } from "../../../models/ModalTipsAlphaX";
import { tradingTips } from "../../../constants/PreguntasAlphaX";
import { 
  ModalContainer, 
  CloseModalButton,
  TipCard
} from "./styled-component/ModalTipsAlphaX.styled";

export const TipsModal: React.FC<TipsModalProps> = ({ open, onClose, onSelectTip }) => {
  const groupedTips = [];
  for (let i = 0; i < tradingTips.length; i += 2) {
    groupedTips.push(tradingTips.slice(i, i + 2));
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseModalButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseModalButton>
        
        <Typography variant="h5" sx={{ 
          mb: 3,
          textAlign: 'left',
          fontWeight: 'bold',
          color: 'white'
        }}>
          Consejos
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {groupedTips.map((pair, pairIndex) => (
            <Box 
              key={pairIndex}
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%'
              }}
            >
              {pair.map((tip, tipIndex) => (
                <TipCard 
                  key={`${pairIndex}-${tipIndex}`}
                  onClick={() => {
                    onSelectTip(tip.content);
                    onClose();
                  }}
                  sx={{ 
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: `4px solid ${tip.color}`
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: 2,
                    color: 'white'
                  }}>
                    <FontAwesomeIcon 
                      icon={tip.icon} 
                      size="lg" 
                      color={tip.color}
                      style={{ marginBottom: '12px' }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2">
                      {tip.content}
                    </Typography>
                  </CardContent>
                </TipCard>
              ))}
              
              {/* Espacio vacío si hay un número impar de items */}
              {pair.length === 1 && (
                <Box sx={{ flex: 1, visibility: 'hidden' }}>
                  <TipCard sx={{ height: '100%' }} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </ModalContainer>
    </Modal>
  );
};