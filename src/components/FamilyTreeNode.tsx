import React from 'react';
import { FamilyMemberCard } from './FamilyMemberCard';

interface FamilyMember {
  id: string;
  name: string;
  hebrewName?: string;
  birthYear?: number;
  deathYear?: number;
  role: string;
  photo?: string;
  biography?: string;
  spouse?: string;
  children?: string[];
  achievements?: string[];
  cultural?: string[];
  generation: number;
  position: { x: number; y: number };
}

interface FamilyTreeNodeProps {
  member: FamilyMember;
  onHover?: (memberId: string | null) => void;
  isHighlighted?: boolean;
  searchTerm?: string;
  children?: React.ReactNode;
  lazy?: boolean;
  animationDelay?: number;
}

export const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = ({
  member,
  onHover,
  isHighlighted,
  searchTerm,
  children,
  lazy = false,
  animationDelay = 0
}) => {
  return (
    <div
      className="tree-node absolute"
      style={{
        left: `${member.position.x}px`,
        top: `${member.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <FamilyMemberCard
          member={member}
          onHover={onHover}
          isHighlighted={isHighlighted}
          searchTerm={searchTerm}
          lazy={lazy}
          animationDelay={animationDelay}
        />
        
        {/* Connection points for family tree lines */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-50" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-50" />
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-1 h-1 bg-primary rounded-full opacity-50" />
        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-1 h-1 bg-primary rounded-full opacity-50" />
      </div>
      
      {children}
    </div>
  );
};