import { Alert } from '@mui/material';

export interface NotificationProps {
  severity: 'success' | 'error';
  content: string;
  onClose?: () => void;
}

export const Notification = ({
  severity,
  content,
  onClose,
}: NotificationProps): JSX.Element => {
  return (
    <Alert
      sx={{ width: 'max-content', marginBottom: '6px', zIndex: 100 }}
      severity={severity}
      onClose={onClose}
    >
      {content}
    </Alert>
  );
}