
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchTypeSelectorProps {
  searchType: string;
  onSearchTypeChange: (type: string) => void;
  loading: boolean;
}

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({
  searchType,
  onSearchTypeChange,
  loading,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {['packages', 'hotels', 'flights', 'transport'].map(type => (
        <Button
          key={type}
          variant={searchType === type ? 'default' : 'outline'}
          onClick={() => onSearchTypeChange(type)}
          className="flex-1 min-w-[120px] backdrop-blur-sm"
          disabled={loading}
        >
          {t(`home.search.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}
        </Button>
      ))}
    </div>
  );
};

export default SearchTypeSelector;
