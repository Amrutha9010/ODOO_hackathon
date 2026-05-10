import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Heart,
  Share2,
  Users,
  Award,
  TrendingUp,
  Wifi,
  Coffee,
  Car,
  Waves,
  Wind,
  Utensils,
  Plane,
  Hotel,
  Camera,
  Mountain
} from 'lucide-react';

const CitySearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('Paragliding');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Sample activity/search results data
  const searchResults = [
    {
      id: 1,
      title: 'Butterfly Paragliding Adventure',
      category: 'Adventure Sports',
      rating: 4.9,
      reviews: 234,
      price: 149,
      duration: '2 hours',
      location: 'Interlaken, Switzerland',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      description: 'Experience the thrill of paragliding over the stunning Swiss Alps with certified instructors.',
      highlights: ['Professional instructor', 'All equipment included', 'Photos & videos', 'Insurance covered'],
      provider: 'Butterfly Adventures',
      contact: '+41 78 123 4567',
      email: 'info@butterflyparagliding.ch',
      website: 'www.butterflyparagliding.ch',
      social: { instagram: '@butterfly_paragliding', facebook: 'ButterflyParagliding' },
      features: ['Expert Guides', 'Safety Certified', 'Best Equipment'],
      availableSpots: 12
    },
    {
      id: 2,
      title: 'Alpine Eagle Paragliding Tour',
      category: 'Adventure Sports',
      rating: 4.8,
      reviews: 187,
      price: 179,
      duration: '2.5 hours',
      location: 'Grindelwald, Switzerland',
      image: 'https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?w=800&h=500&fit=crop',
      description: 'Soar like an eagle above the breathtaking landscapes of Grindelwald and the Jungfrau region.',
      highlights: ['Mountain views', 'Professional photos', 'Video recording', 'Hotel pickup'],
      provider: 'Careful Rook Adventures',
      contact: '+41 78 987 6543',
      email: 'hello@carefulrook.com',
      website: 'www.carefulrook.com',
      social: { instagram: '@carefulrook', twitter: '@carefulrook' },
      features: ['Small groups', 'Premium gear', 'Refreshments included'],
      availableSpots: 8
    },
    {
      id: 3,
      title: 'Sunrise Paragliding Experience',
      category: 'Adventure Sports',
      rating: 5.0,
      reviews: 342,
      price: 199,
      duration: '3 hours',
      location: 'Lucerne, Switzerland',
      image: 'https://images.unsplash.com/photo-1571204829887-3b8d69f1c5ed?w=800&h=500&fit=crop',
      description: 'Witness the magic of sunrise from above the clouds on this unforgettable paragliding journey.',
      highlights: ['Sunrise views', 'Breakfast included', 'Professional photos', 'Private experience'],
      provider: 'Earnest Spoonbill Expeditions',
      contact: '+41 78 456 7890',
      email: 'fly@earnestspoonbill.com',
      website: 'www.earnestspoonbill.com',
      social: { instagram: '@earnest_spoonbill', facebook: 'EarnestSpoonbill' },
      features: ['Sunrise slot', 'Premium package', 'Full breakfast'],
      availableSpots: 5
    },
    {
      id: 4,
      title: 'Mountain Ridge Paragliding',
      category: 'Adventure Sports',
      rating: 4.7,
      reviews: 156,
      price: 129,
      duration: '1.5 hours',
      location: 'Zermatt, Switzerland',
      image: 'https://images.unsplash.com/photo-1522729093435-0739b9b3fe9e?w=800&h=500&fit=crop',
      description: 'Fly alongside the iconic Matterhorn and experience the ultimate mountain adventure.',
      highlights: ['Matterhorn views', 'Expert pilots', 'Action camera included', 'Thermal flying'],
      provider: 'Cool Mart Adventures',
      contact: '+41 78 234 5678',
      email: 'fly@coolmart.com',
      website: 'www.coolmartadventures.com',
      social: { instagram: '@coolmart_adventures', twitter: '@coolmart' },
      features: ['Best views', 'Experienced team', 'Flexible booking'],
      availableSpots: 15
    },
    {
      id: 5,
      title: 'Tandem Paragliding Experience',
      category: 'Adventure Sports',
      rating: 4.9,
      reviews: 421,
      price: 159,
      duration: '2 hours',
      location: 'Geneva, Switzerland',
      image: 'https://images.unsplash.com/photo-1571204829887-3b8d69f1c5ed?w=800&h=500&fit=crop',
      description: 'Perfect for beginners! Fly tandem with experienced instructors over beautiful Lake Geneva.',
      highlights: ['Beginner friendly', 'Lake views', 'Photos included', 'Safety briefing'],
      provider: 'Prane Adventures',
      contact: '+41 78 345 6789',
      email: 'hello@praneadventures.com',
      website: 'www.praneadventures.com',
      social: { instagram: '@prane_adventures', facebook: 'PraneAdventures' },
      features: ['Tandem flights', 'All skill levels', 'Free cancellation'],
      availableSpots: 20
    }
  ];

  // Filter results based on search query, group, and sort
  const getFilteredResults = () => {
    let filtered = [...searchResults];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Group by
    if (activeGroup === 'location') {
      filtered = [...filtered].sort((a, b) => a.location.localeCompare(b.location));
    } else if (activeGroup === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (activeGroup === 'duration') {
      filtered = [...filtered].sort((a, b) => a.duration.localeCompare(b.duration));
    }
    
    // Sort by
    if (sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
    }
    
    return filtered;
  };

  const filteredResults = getFilteredResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#FF6584] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="glass-effect px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium">✨ Activity Search</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            Find Your Adventure
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover amazing activities and experiences in cities around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search activities, destinations, or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-all"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer"
                  style={{ color: '#6C63FF' }}
                >
                  <option value="all" style={{ color: '#6C63FF' }}>Group by: All</option>
                  <option value="location" style={{ color: '#6C63FF' }}>Location</option>
                  <option value="price" style={{ color: '#6C63FF' }}>Price</option>
                  <option value="duration" style={{ color: '#6C63FF' }}>Duration</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6C63FF' }} />
              </div>
              
              <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 hover:bg-white/10 transition-all group flex items-center gap-2">
                <Filter className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Filter
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer"
                  style={{ color: '#6C63FF' }}
                >
                  <option value="rating" style={{ color: '#6C63FF' }}>Sort by: Rating</option>
                  <option value="price_low" style={{ color: '#6C63FF' }}>Price: Low to High</option>
                  <option value="price_high" style={{ color: '#6C63FF' }}>Price: High to Low</option>
                  <option value="popularity" style={{ color: '#6C63FF' }}>Popularity</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6C63FF' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/60 text-sm">
            Found <span className="text-[#6C63FF] font-semibold">{filteredResults.length}</span> results for "{searchQuery}"
          </p>
        </div>

        {/* Search Results Grid */}
        <div className="space-y-6">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-effect rounded-2xl p-8">
                <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-white/40 text-sm mt-2">Try searching with different keywords</p>
              </div>
            </div>
          ) : (
            filteredResults.map((result) => (
              <div
                key={result.id}
                className="group glass-effect rounded-2xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Result Image */}
                  <div className="md:w-80 h-48 md:h-auto overflow-hidden relative">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {result.rating}
                      </span>
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
                        {result.reviews} reviews
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-[#FF6584] transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Result Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">
                          {result.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-[#FF6584]" />
                          <p className="text-white/60 text-sm">{result.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#6C63FF]">${result.price}</p>
                        <p className="text-white/40 text-xs">per person</p>
                      </div>
                    </div>
                    
                    {/* Provider */}
                    <div className="mb-3">
                      <p className="text-white/50 text-sm">Provided by <span className="text-white/80 font-medium">{result.provider}</span></p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {result.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/70">
                          {highlight}
                        </span>
                      ))}
                      {result.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/50">
                          +{result.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {result.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-white/50 text-xs">
                          <Award className="w-3 h-3 text-[#6C63FF]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Duration & Availability */}
                    <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock className="w-4 h-4 text-[#6C63FF]" />
                        <span>{result.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Users className="w-4 h-4 text-[#FF6584]" />
                        <span>{result.availableSpots} spots left</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details Section (visible on hover/click) */}
                <div className="border-t border-white/10 p-4 bg-white/5 hidden md:block">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-white/60 hover:text-[#6C63FF] transition-colors text-sm">
                        <Phone className="w-4 h-4" />
                        {result.contact}
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-[#6C63FF] transition-colors text-sm">
                        <Mail className="w-4 h-4" />
                        {result.email}
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-[#6C63FF] transition-colors text-sm">
                        <Globe className="w-4 h-4" />
                        {result.website}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-[#6C63FF]/20 transition-colors">
                       <Globe className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-[#6C63FF]/20 transition-colors">
                        <Globe className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-[#6C63FF]/20 transition-colors">
                        <MessageCircle className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-[#6C63FF]/20 transition-colors">
                        <Share2 className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
          border-color: rgba(108, 99, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CitySearchPage;