
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export const useSearchLogic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchType, setSearchType] = useState('packages');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    // Basic validation
    if (!destination && searchType !== 'packages') {
      toast({
        title: "Missing Information",
        description: "Please select a destination to search.",
        variant: "destructive",
      });
      return;
    }

    if (searchType === 'flights' && !departureDate) {
      toast({
        title: "Missing Information", 
        description: "Please select a departure date for flight search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Build search parameters
      const params = new URLSearchParams();
      
      // Add common parameters
      if (destination) {
        params.append('city', destination);
        params.append('destination', destination);
      }
      if (departureDate) {
        params.append('date', format(departureDate, 'yyyy-MM-dd'));
        params.append('departure_date', format(departureDate, 'yyyy-MM-dd'));
      }
      if (duration) {
        params.append('duration', duration);
      }

      // Navigate based on search type with appropriate filters
      switch (searchType) {
        case 'packages':
          if (destination) params.append('location', destination);
          navigate(`/packages?${params.toString()}`);
          break;
          
        case 'hotels':
          // Use the search page for hotels with city filter
          if (destination) params.append('location', destination);
          navigate(`/search?${params.toString()}`);
          break;
          
        case 'flights':
          // Add flight-specific parameters
          if (destination) {
            params.append('to', destination);
            params.append('destination', destination);
          }
          navigate(`/flights?${params.toString()}`);
          break;
          
        case 'transport':
          // Add transport-specific parameters
          if (destination) {
            params.append('to_city', destination);
            params.append('destination_city', destination);
          }
          params.append('passengers', '1'); // Default passengers
          navigate(`/transport?${params.toString()}`);
          break;
          
        default:
          navigate('/search');
      }

      // Show success message
      toast({
        title: "Search Started",
        description: `Searching for ${searchType} in ${destination || 'all locations'}...`,
      });

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "There was an error with your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    searchType,
    setSearchType,
    destination,
    setDestination,
    departureDate,
    setDepartureDate,
    duration,
    setDuration,
    loading,
    handleSearch,
  };
};
