import React, { memo } from 'react';
import './AuroraText.css';

const AuroraText = memo(({
  children,
  className = '',
  colors = ['#FFFFFF', '#FF5A09', '#FFA500', '#FFD07B', '#FFFFFF'],
  speed = 1,
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`,
    animationDuration: `${8 / speed}s`,
  };

  return (
    <span
      className={`aurora-text-animated ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
});

AuroraText.displayName = 'AuroraText';

export default AuroraText;
