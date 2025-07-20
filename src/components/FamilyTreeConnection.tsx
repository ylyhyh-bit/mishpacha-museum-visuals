import React from 'react';

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse' | 'sibling';
  isHighlighted?: boolean;
}

export const FamilyTreeConnection: React.FC<ConnectionProps> = ({
  from,
  to,
  type,
  isHighlighted = false
}) => {
  const getConnectionStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      transformOrigin: 'center',
      transition: 'all 0.3s ease',
      zIndex: 1,
    };

    switch (type) {
      case 'parent-child':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--primary))',
          opacity: isHighlighted ? 1 : 0.6,
          filter: isHighlighted ? 'drop-shadow(0 0 8px hsl(var(--primary-glow)))' : 'none',
        };
      case 'spouse':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--cultural))',
          opacity: isHighlighted ? 1 : 0.5,
          filter: isHighlighted ? 'drop-shadow(0 0 6px hsl(var(--cultural)))' : 'none',
        };
      case 'sibling':
        return {
          ...baseStyle,
          backgroundColor: 'hsl(var(--accent))',
          opacity: isHighlighted ? 0.8 : 0.4,
          filter: isHighlighted ? 'drop-shadow(0 0 4px hsl(var(--accent)))' : 'none',
        };
      default:
        return baseStyle;
    }
  };

  const renderConnection = () => {
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    if (type === 'parent-child') {
      // L-shaped connection for parent-child relationships
      const midY = from.y + (to.y - from.y) * 0.5;
      
      return (
        <>
          {/* Vertical line from parent */}
          <div
            className="tree-line tree-line-vertical"
            style={{
              ...getConnectionStyle(),
              left: from.x - 1,
              top: from.y,
              height: Math.abs(midY - from.y),
              width: '2px',
            }}
          />
          
          {/* Horizontal line */}
          <div
            className="tree-line tree-line-horizontal"
            style={{
              ...getConnectionStyle(),
              left: Math.min(from.x, to.x),
              top: midY - 1,
              width: Math.abs(to.x - from.x),
              height: '2px',
            }}
          />
          
          {/* Vertical line to child */}
          <div
            className="tree-line tree-line-vertical"
            style={{
              ...getConnectionStyle(),
              left: to.x - 1,
              top: midY,
              height: Math.abs(to.y - midY),
              width: '2px',
            }}
          />
        </>
      );
    }

    // Direct line for spouse and sibling connections
    return (
      <div
        className="tree-line"
        style={{
          ...getConnectionStyle(),
          left: from.x,
          top: from.y,
          width: distance,
          height: type === 'spouse' ? '3px' : '2px',
          transform: `rotate(${angle}deg)`,
        }}
      />
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {renderConnection()}
      
      {/* Connection decorations */}
      {type === 'spouse' && (
        <div
          className="absolute w-2 h-2 bg-cultural rounded-full opacity-60 transition-all duration-300"
          style={{
            left: from.x + (to.x - from.x) * 0.5 - 4,
            top: from.y + (to.y - from.y) * 0.5 - 4,
            transform: isHighlighted ? 'scale(1.5)' : 'scale(1)',
          }}
        >
          <div className="absolute inset-0 bg-cultural rounded-full animate-ping opacity-30" />
        </div>
      )}
      
      {type === 'parent-child' && (
        <div
          className="absolute text-primary text-xs opacity-50 font-hebrew"
          style={{
            left: from.x + (to.x - from.x) * 0.5 - 8,
            top: from.y + (to.y - from.y) * 0.5 - 6,
            fontSize: '10px',
          }}
        >
          ↓
        </div>
      )}
    </div>
  );
};