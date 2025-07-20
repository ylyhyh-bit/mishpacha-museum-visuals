import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, Users, Star } from 'lucide-react';

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
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  isHighlighted?: boolean;
  onHover?: (memberId: string | null) => void;
  searchTerm?: string;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  isHighlighted = false,
  onHover,
  searchTerm = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  };

  const lifeSpan = member.birthYear 
    ? `${member.birthYear}${member.deathYear ? ` - ${member.deathYear}` : ' - כיום'}`
    : '';

  return (
    <Card 
      className={`museum-card relative overflow-hidden transition-all duration-500 ${
        isHighlighted ? 'ring-2 ring-primary shadow-glow' : ''
      }`}
      onMouseEnter={() => onHover?.(member.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Heritage Frame */}
      <div className="museum-frame">
        <div className="relative bg-card rounded-lg p-6">
          {/* Cultural Ornament */}
          <div className="hebrew-ornament absolute top-2 left-2" />
          
          {/* Photo Section */}
          <div className="relative mb-4 flex justify-center">
            <div className="relative">
              {member.photo && !imageError ? (
                <div className="relative overflow-hidden rounded-full w-24 h-24 bg-muted border-4 border-primary/20">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-museum flex items-center justify-center border-4 border-primary/20">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Hebrew Name */}
          <div className="text-center mb-3">
            <h3 
              className="font-hebrew-serif text-lg font-semibold text-foreground"
              dangerouslySetInnerHTML={{ __html: highlightText(member.name) }}
            />
            {member.hebrewName && (
              <p 
                className="font-hebrew text-sm text-muted-foreground mt-1"
                dangerouslySetInnerHTML={{ __html: highlightText(member.hebrewName) }}
              />
            )}
          </div>

          {/* Role and Life Span */}
          <div className="text-center mb-4 space-y-1">
            <Badge variant="secondary" className="font-hebrew text-xs">
              {member.role}
            </Badge>
            {lifeSpan && (
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span className="font-hebrew">{lifeSpan}</span>
              </div>
            )}
          </div>

          {/* Spouse Connection */}
          {member.spouse && (
            <div className="flex items-center justify-center gap-1 mb-2 text-xs text-cultural">
              <Heart className="w-3 h-3" />
              <span className="font-hebrew">זוג/ה: {member.spouse}</span>
            </div>
          )}

          {/* Children Count */}
          {member.children && member.children.length > 0 && (
            <div className="flex items-center justify-center gap-1 mb-3 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span className="font-hebrew">{member.children.length} ילדים</span>
            </div>
          )}

          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-primary">
                <Star className="w-3 h-3" />
                <span className="font-hebrew font-medium">הישגים</span>
              </div>
              <div className="space-y-1">
                {member.achievements.slice(0, 2).map((achievement, index) => (
                  <p 
                    key={index}
                    className="text-xs text-muted-foreground font-hebrew"
                    dangerouslySetInnerHTML={{ __html: highlightText(achievement) }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Cultural Elements */}
          {member.cultural && member.cultural.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1 justify-center">
                {member.cultural.slice(0, 3).map((element, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs font-hebrew bg-cultural/10 text-cultural border-cultural/20"
                  >
                    {element}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-museum opacity-0 transition-opacity duration-300 hover:opacity-10 rounded-lg" />
        </div>
      </div>
    </Card>
  );
};