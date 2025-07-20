import React, { useState } from 'react';
import { Search, Settings, Download, Upload, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchProgress, DataSavingIndicator } from './UserFeedback';

interface FamilyMuseumHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  memberCount: number;
  generationCount: number;
  isSearching?: boolean;
  searchResultCount?: number;
  isSaving?: boolean;
  lastSaved?: Date;
}

export const FamilyMuseumHeader: React.FC<FamilyMuseumHeaderProps> = ({
  searchTerm,
  onSearchChange,
  memberCount,
  generationCount,
  isSearching = false,
  searchResultCount = 0,
  isSaving = false,
  lastSaved
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Main Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-museum rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-hebrew-serif font-bold text-foreground">
                  אוסף המשפחה
                </h1>
                <p className="text-sm text-muted-foreground font-hebrew">
                  מוזיאון דיגיטלי למורשת המשפחה
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-3">
            <Badge variant="secondary" className="font-hebrew">
              <Users className="w-3 h-3 ml-1" />
              {memberCount} בני משפחה
            </Badge>
            <Badge variant="outline" className="font-hebrew">
              {generationCount} דורות
            </Badge>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="חפש בן משפחה..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pr-10 font-hebrew transition-all duration-300 ${
                  isSearchFocused ? 'ring-2 ring-primary/50 shadow-glow' : ''
                }`}
                dir="rtl"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="font-hebrew">
              <Upload className="w-4 h-4 ml-1" />
              ייבוא
            </Button>
            <Button variant="outline" size="sm" className="font-hebrew">
              <Download className="w-4 h-4 ml-1" />
              ייצוא
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Progress */}
        {searchTerm && (
          <div className="mt-4">
            <SearchProgress
              searchTerm={searchTerm}
              resultCount={searchResultCount}
              isSearching={isSearching}
            />
          </div>
        )}

        {/* Data Saving Status */}
        <div className="mt-3 flex justify-end">
          <DataSavingIndicator isSaving={isSaving} lastSaved={lastSaved} />
        </div>
      </div>
    </div>
  );
};