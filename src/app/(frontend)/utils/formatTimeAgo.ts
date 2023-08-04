// utils/formatTimeAgo.ts
import { formatDistanceToNow } from 'date-fns';

const formatTimeAgo = (timestamp: Date | string): string => {
  const parsedDate = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

export default formatTimeAgo;
