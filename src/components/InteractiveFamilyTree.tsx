import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { FamilyTreeNode } from './FamilyTreeNode';
import { FamilyTreeConnection } from './FamilyTreeConnection';
import { LoadingSpinner } from './UserFeedback';

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
  parentIds?: string[];
}

interface InteractiveFamilyTreeProps {
  members: FamilyMember[];
  searchTerm?: string;
  isLoading?: boolean;
  enableVirtualization?: boolean;
  pageSize?: number;
}

export const InteractiveFamilyTree: React.FC<InteractiveFamilyTreeProps> = ({
  members,
  searchTerm = '',
  isLoading = false,
  enableVirtualization = members.length > 100,
  pageSize = 50
}) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [treeLayout, setTreeLayout] = useState({ width: 1200, height: 800 });
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: pageSize });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Calculate family tree layout
  const treeData = useMemo(() => {
    const generations = new Map<number, FamilyMember[]>();
    const connections: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      type: 'parent-child' | 'spouse' | 'sibling';
      memberIds: string[];
    }> = [];

    // Group members by generation
    members.forEach(member => {
      const gen = member.generation;
      if (!generations.has(gen)) {
        generations.set(gen, []);
      }
      generations.get(gen)!.push(member);
    });

    // Calculate positions for each generation
    const generationHeight = 200;
    const memberWidth = 280;
    const maxGeneration = Math.max(...Array.from(generations.keys()));
    const minGeneration = Math.min(...Array.from(generations.keys()));

    const positionedMembers: FamilyMember[] = [];

    // Position members in each generation
    Array.from(generations.entries())
      .sort(([a], [b]) => a - b)
      .forEach(([generation, genMembers]) => {
        const generationY = (generation - minGeneration) * generationHeight + 150;
        const startX = (treeLayout.width - (genMembers.length * memberWidth)) / 2;

        genMembers.forEach((member, index) => {
          const x = startX + (index * memberWidth) + memberWidth / 2;
          positionedMembers.push({
            ...member,
            position: { x, y: generationY }
          });
        });
      });

    // Calculate connections
    positionedMembers.forEach(member => {
      // Parent-child connections
      if (member.children) {
        member.children.forEach(childId => {
          const child = positionedMembers.find(m => m.id === childId);
          if (child) {
            connections.push({
              from: member.position,
              to: child.position,
              type: 'parent-child',
              memberIds: [member.id, child.id]
            });
          }
        });
      }

      // Spouse connections
      if (member.spouse) {
        const spouse = positionedMembers.find(m => m.name === member.spouse);
        if (spouse && member.id < spouse.id) { // Avoid duplicate lines
          connections.push({
            from: member.position,
            to: spouse.position,
            type: 'spouse',
            memberIds: [member.id, spouse.id]
          });
        }
      }
    });

    return { members: positionedMembers, connections };
  }, [members, treeLayout]);

  // Optimized search with debouncing for performance
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return treeData.members;
    
    const searchLower = searchTerm.toLowerCase();
    return treeData.members.filter(member => {
      // Primary search fields (fast checks first)
      if (member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Secondary search fields
      if (member.hebrewName?.includes(searchTerm)) return true;
      
      // Tertiary search fields (more expensive)
      if (member.achievements?.some(a => a.toLowerCase().includes(searchLower))) return true;
      if (member.cultural?.some(c => c.includes(searchTerm))) return true;
      
      return false;
    });
  }, [treeData.members, searchTerm]);

  // Virtualized members for performance with large datasets
  const virtualizedMembers = useMemo(() => {
    if (!enableVirtualization) return filteredMembers;
    
    return filteredMembers.slice(visibleRange.start, visibleRange.end);
  }, [filteredMembers, enableVirtualization, visibleRange]);

  // Optimized hover handler with useCallback
  const handleHover = useCallback((memberId: string | null) => {
    setHoveredMember(memberId);
  }, []);

  // Determine highlighted connections
  const highlightedConnections = useMemo(() => {
    if (!hoveredMember) return new Set<string>();
    
    const relatedMembers = new Set([hoveredMember]);
    const member = treeData.members.find(m => m.id === hoveredMember);
    
    if (member) {
      // Add children
      if (member.children) {
        member.children.forEach(childId => relatedMembers.add(childId));
      }
      
      // Add parents
      if (member.parentIds) {
        member.parentIds.forEach(parentId => relatedMembers.add(parentId));
      }
      
      // Add spouse
      if (member.spouse) {
        const spouse = treeData.members.find(m => m.name === member.spouse);
        if (spouse) relatedMembers.add(spouse.id);
      }
    }
    
    return relatedMembers;
  }, [hoveredMember, treeData.members]);

  // Optimized resize handler with throttling
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setTreeLayout({
          width: Math.max(1200, window.innerWidth - 100),
          height: Math.max(800, window.innerHeight - 200)
        });
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Scroll handler for virtualization
  useEffect(() => {
    if (!enableVirtualization || !containerRef.current) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        
        const container = containerRef.current;
        if (!container) return;
        
        const scrollTop = container.scrollTop;
        const itemHeight = 250; // Approximate card height
        const containerHeight = container.clientHeight;
        
        const start = Math.floor(scrollTop / itemHeight) * 3; // 3 cards per row
        const visibleItems = Math.ceil(containerHeight / itemHeight) * 3;
        const end = Math.min(start + visibleItems + pageSize, filteredMembers.length);
        
        setVisibleRange({ start, end });
      }, 100);
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [enableVirtualization, filteredMembers.length, pageSize]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner text="טוען עץ המשפחה..." size="lg" />
      </div>
    );
  }

  if (filteredMembers.length === 0 && searchTerm) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div>
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-hebrew font-semibold text-foreground mb-2">
            לא נמצאו תוצאות
          </h3>
          <p className="text-muted-foreground font-hebrew">
            נסה חיפוש אחר או נקה את תיבת החיפוש
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-heritage min-h-screen overflow-auto smooth-scroll"
    >
      <div 
        className="relative mx-auto"
        style={{ 
          width: `${treeLayout.width}px`, 
          height: `${treeLayout.height}px`,
          minHeight: '600px'
        }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'var(--pattern-dots)',
            backgroundSize: '30px 30px'
          }}
        />

        {/* Family tree connections */}
        <div className="absolute inset-0">
          {treeData.connections.map((connection, index) => (
            <FamilyTreeConnection
              key={index}
              from={connection.from}
              to={connection.to}
              type={connection.type}
              isHighlighted={connection.memberIds.some(id => 
                highlightedConnections.has(id)
              )}
            />
          ))}
        </div>

        {/* Family members with performance optimization */}
        <div className="relative">
          {(enableVirtualization ? virtualizedMembers : filteredMembers).map((member, index) => {
            const actualIndex = enableVirtualization ? visibleRange.start + index : index;
            const animationDelay = Math.min(actualIndex * 50, 2000); // Cap at 2s
            
            return (
              <div
                key={member.id}
                className={isScrolling ? 'gpu-accelerated' : 'slide-up-museum'}
                style={{
                  animationDelay: `${animationDelay}ms`,
                  animationFillMode: 'both'
                }}
              >
                <FamilyTreeNode
                  member={member}
                  onHover={handleHover}
                  isHighlighted={
                    highlightedConnections.has(member.id) ||
                    (searchTerm && (
                      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (member.hebrewName && member.hebrewName.includes(searchTerm))
                    ))
                  }
                  searchTerm={searchTerm}
                  lazy={enableVirtualization}
                  animationDelay={animationDelay}
                />
              </div>
            );
          })}
        </div>

        {/* Performance indicator for large datasets */}
        {enableVirtualization && (
          <div className="fixed bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs font-hebrew">
            מציג {virtualizedMembers.length} מתוך {filteredMembers.length} פריטים
          </div>
        )}

        {/* Generation labels */}
        <div className="absolute right-4 top-4 space-y-4">
          {Array.from(new Set(treeData.members.map(m => m.generation)))
            .sort((a, b) => a - b)
            .map(generation => (
              <div
                key={generation}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-hebrew"
                style={{
                  top: `${(generation - Math.min(...treeData.members.map(m => m.generation))) * 200 + 100}px`
                }}
              >
                דור {generation + 1}
              </div>
            ))}
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 flex gap-2">
          <div className="text-xs font-hebrew text-muted-foreground px-2 py-1">
            גרור לתפריט • העבר עכבר על כרטיס לראות קשרים
          </div>
        </div>
      </div>
    </div>
  );
};