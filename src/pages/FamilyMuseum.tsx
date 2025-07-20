import React, { useState, useEffect } from 'react';
import { FamilyMuseumHeader } from '@/components/FamilyMuseumHeader';
import { InteractiveFamilyTree } from '@/components/InteractiveFamilyTree';
import { FeedbackAlert } from '@/components/UserFeedback';
import { sampleFamilyData } from '@/data/familyData';
import { useToast } from '@/hooks/use-toast';

export const FamilyMuseum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast } = useToast();

  // Simulate initial data loading
  useEffect(() => {
    const loadMuseum = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setLastSaved(new Date());
      
      toast({
        title: "ברוכים הבאים למוזיאון המשפחה",
        description: "העץ המשפחה נטען בהצלחה",
      });
      
      // Hide welcome message after 3 seconds
      setTimeout(() => setShowWelcome(false), 3000);
    };

    loadMuseum();
  }, [toast]);

  // Handle search with debouncing
  useEffect(() => {
    if (!searchTerm) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTimeout = setTimeout(() => {
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  // Simulate auto-save
  useEffect(() => {
    if (!searchTerm) return;

    const saveTimeout = setTimeout(() => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }, 2000);

    return () => clearTimeout(saveTimeout);
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const searchResults = searchTerm 
    ? sampleFamilyData.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.hebrewName && member.hebrewName.includes(searchTerm)) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.achievements && member.achievements.some(a => 
          a.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (member.cultural && member.cultural.some(c => 
          c.includes(searchTerm)
        ))
      )
    : sampleFamilyData;

  const generationCount = new Set(sampleFamilyData.map(m => m.generation)).size;

  return (
    <div className="min-h-screen bg-gradient-heritage">
      {/* Header */}
      <FamilyMuseumHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        memberCount={sampleFamilyData.length}
        generationCount={generationCount}
        isSearching={isSearching}
        searchResultCount={searchResults.length}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed top-24 right-6 z-50 max-w-md">
          <FeedbackAlert
            type="success"
            title="ברוכים הבאים למוזיאון המשפחה!"
            description="גלה את סיפור המשפחה ההיסטורי. העבר עכבר על הכרטיסים לראות קשרים משפחתיים."
            isVisible={true}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        <InteractiveFamilyTree
          members={searchTerm ? searchResults : sampleFamilyData}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
      </main>

      {/* Floating Action Messages */}
      {searchTerm && !isSearching && searchResults.length === 0 && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm">
          <FeedbackAlert
            type="warning"
            title="לא נמצאו תוצאות"
            description={`החיפוש "${searchTerm}" לא העלה תוצאות. נסה מילת חיפוש אחרת.`}
            isVisible={true}
          />
        </div>
      )}

      {searchTerm && searchResults.length > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-success/90 backdrop-blur-sm text-success-foreground px-4 py-2 rounded-lg font-hebrew text-sm shadow-lg">
            ✨ נמצאו {searchResults.length} תוצאות עבור "{searchTerm}"
          </div>
        </div>
      )}

      {/* Cultural Background Elements */}
      <div className="fixed bottom-4 left-4 text-primary/20 text-6xl pointer-events-none">
        ✡
      </div>
      <div className="fixed top-32 left-8 text-cultural/15 text-4xl pointer-events-none">
        📿
      </div>
      <div className="fixed top-1/2 right-8 text-primary/10 text-5xl pointer-events-none">
        🕯️
      </div>
    </div>
  );
};