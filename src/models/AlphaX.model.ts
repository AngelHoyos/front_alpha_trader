
export interface ChatMessage {
    type: "question" | "answer" | 'error';
    content: string;
  }
  
 export  interface UseChatLogicProps {
    botReply: string | null;
    message: string;
    error:string | null;
    loading: boolean;
    onSubmit: () => void;
    resetMessage: () => void; 
    setError: (error: string | null) => void;
  }
  