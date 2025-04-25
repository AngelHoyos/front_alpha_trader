export interface TipsModalProps {
    open: boolean;
    onClose: () => void;
    onSelectTip: (tip: string) => void;
  }