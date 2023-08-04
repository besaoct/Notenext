// components/TimeAgo.tsx
import React from 'react';
import formatTimeAgo from '../../utils/formatTimeAgo';

interface TimeAgoProps {
  timestamp: Date | string// Pass the timestamp as a string
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const timeAgo = formatTimeAgo(timestamp);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
