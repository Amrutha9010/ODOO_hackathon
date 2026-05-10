import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Mountain,
  Calendar,
  Info,
  CheckCircle,
  X,
  Navigation
} from 'lucide-react';

const CitySearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('Paragliding');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedResult, setSelectedResult] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Working image URLs from Unsplash
  const sampleResults = [
    {
      id: 1,
      title: 'Butterfly Paragliding Adventure',
      category: 'Adventure Sports',
      rating: 4.9,
      reviews: 234,
      price: 149,
      duration: '2 hours',
      location: 'Interlaken, Switzerland',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      description: 'Experience the thrill of paragliding over the stunning Swiss Alps with certified instructors. Feel the wind beneath your wings as you soar above breathtaking landscapes.',
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
      image: 'https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?w=600&h=400&fit=crop',
      description: 'Soar like an eagle above the breathtaking landscapes of Grindelwald and the Jungfrau region. Experience the ultimate mountain adventure.',
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
      image: 'https://images.unsplash.com/photo-1571204829887-3b8d69f1c5ed?w=600&h=400&fit=crop',
      description: 'Witness the magic of sunrise from above the clouds on this unforgettable paragliding journey. A truly magical experience.',
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
      image: 'https://images.unsplash.com/photo-1522729093435-0739b9b3fe9e?w=600&h=400&fit=crop',
      description: 'Fly alongside the iconic Matterhorn and experience the ultimate mountain adventure. Perfect for photography enthusiasts.',
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
      image: 'https://images.unsplash.com/photo-1571204829887-3b8d69f1c5ed?w=600&h=400&fit=crop',
      description: 'Perfect for beginners! Fly tandem with experienced instructors over beautiful Lake Geneva. No experience needed.',
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

  const [searchResults, setSearchResults] = useState(sampleResults);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const getFilteredResults = () => {
    let filtered = [...searchResults];
    
    if (searchQuery) {
      filtered = filtered.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeGroup === 'location') {
      filtered = [...filtered].sort((a, b) => a.location.localeCompare(b.location));
    } else if (activeGroup === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (activeGroup === 'duration') {
      filtered = [...filtered].sort((a, b) => a.duration.localeCompare(b.duration));
    }
    
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1a] via-[#030518] to-[#01010f]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6C63FF] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF6584] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-4">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium flex items-center gap-2">
                <Mountain size={14} />
                Activity Search
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-playfair bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            Find Your Adventure
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing activities and experiences in cities around the world
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search activities, destinations, or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="all">Group by: All</option>
                  <option value="location">Location</option>
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
              </div>
              
              <button className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-gray-300 hover:bg-[rgba(255,255,255,0.1)] transition-all group flex items-center gap-2">
                <Filter size={18} className="group-hover:rotate-12 transition-transform" />
                Filter
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="rating">Sort by: Rating</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-gray-400 text-sm">
            Found <span className="text-indigo-400 font-semibold">{filteredResults.length}</span> results for “
            <span className="text-white">{searchQuery}</span>”
          </p>
        </motion.div>

        {/* Search Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence>
            {filteredResults.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-12">
                <div className="glass-card rounded-2xl p-12">
                  <Search size={64} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
                </div>
              </motion.div>
            ) : (
              filteredResults.map((result) => (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Result Image */}
                    <div className="md:w-80 h-52 md:h-auto overflow-hidden relative">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          {result.rating}
                        </span>
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
                          {result.reviews} reviews
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(result.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-pink-500/80 transition-colors"
                      >
                        <Heart 
                          size={16} 
                          className={`transition-colors ${wishlist.includes(result.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`}
                        />
                      </button>
                    </div>
                    
                    {/* Result Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white hover:text-indigo-400 transition-colors">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={14} className="text-pink-400" />
                            <p className="text-gray-400 text-sm">{result.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-indigo-400">${result.price}</p>
                          <p className="text-gray-500 text-xs">per person</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {result.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {result.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-gray-500 text-xs">
                            <CheckCircle size={12} className="text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Duration & Availability */}
                      <div className="flex items-center gap-6 pt-3 border-t border-[rgba(255,255,255,0.1)]">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Clock size={14} className="text-indigo-400" />
                          <span>{result.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Users size={14} className="text-pink-400" />
                          <span>{result.availableSpots} spots left</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Award size={14} className="text-yellow-400" />
                          <span>Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Provider Info Bar */}
                  <div className="border-t border-[rgba(255,255,255,0.05)] p-4 bg-[rgba(255,255,255,0.02)]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-gray-500 text-sm">Provided by:</span>
                        <span className="text-white text-sm font-medium">{result.provider}</span>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Phone size={12} />
                          <span>{result.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Mail size={12} />
                          <span>{result.email}</span>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all">
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selectedResult.image}
                  alt={selectedResult.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedResult(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedResult.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} className="text-pink-400" />
                      <p className="text-gray-400">{selectedResult.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-400">${selectedResult.price}</p>
                    <p className="text-gray-500 text-sm">per person</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{selectedResult.rating}</span>
                    <span className="text-gray-500 text-sm">({selectedResult.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-indigo-400" />
                    <span className="text-gray-400 text-sm">{selectedResult.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-pink-400" />
                    <span className="text-gray-400 text-sm">{selectedResult.availableSpots} spots left</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-400 leading-relaxed">{selectedResult.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedResult.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                        <CheckCircle size={14} className="text-green-500" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Phone size={14} className="text-indigo-400" />
                      <span>{selectedResult.contact}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Mail size={14} className="text-indigo-400" />
                      <span>{selectedResult.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Globe size={14} className="text-indigo-400" />
                      <span>{selectedResult.website}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all">
                    Book Now
                  </button>
                  <button className="px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-gray-300 hover:bg-[rgba(255,255,255,0.1)] transition-all">
                    Save to Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass-card {
          background: rgba(15, 25, 45, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(108, 99, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          border-color: rgba(108, 99, 255, 0.6);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default CitySearchPage;