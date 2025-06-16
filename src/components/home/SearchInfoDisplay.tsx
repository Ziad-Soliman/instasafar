
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchInfoDisplayProps {
  searchType: string;
}

const SearchInfoDisplay: React.FC<SearchInfoDisplayProps> = ({ searchType }) => {
  const { t } = useLanguage();

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
      <p className="text-sm text-muted-foreground text-center">
        {searchType === 'packages' && t('home.search.packagesInfo', 'Search for complete travel packages including accommodation and activities')}
        {searchType === 'hotels' && t('home.search.hotelsInfo', 'Find the perfect accommodation for your stay')}
        {searchType === 'flights' && t('home.search.flightsInfo', 'Book flights to your desired destination')}
        {searchType === 'transport' && t('home.search.transportInfo', 'Find reliable transport options between cities')}
      </p>
    </div>
  );
};

export default SearchInfoDisplay;
