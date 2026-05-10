import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  DollarSign, 
  Plus, 
  MapPin, 
  Hotel, 
  Plane, 
  Coffee, 
  Mountain,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock as ClockIcon,
  PlayCircle,
  XCircle,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Sparkles,
  Eye
} from 'lucide-react';

const ItineraryViewPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('ongoing');
  const [viewMode, setViewMode] = useState('grid');

  // Sample trip data
  const trips = [
    {
      id: 1,
      title: 'European Summer Adventure',
      status: 'ongoing',
      startDate: '2025-06-15',
      endDate: '2025-06-28',
      destination: 'Paris, France → Rome, Italy → Barcelona, Spain',
      budget: 4850,
      progress: 65,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop',
      sections: 12,
      completedSections: 8,
      host: 'Krishna Kumar Gupta',
      rating: 4.8,
      highlights: ['Eiffel Tower', 'Colosseum', 'Sagrada Familia']
    },
    {
      id: 2,
      title: 'Tokyo Discovery Tour',
      status: 'upcoming',
      startDate: '2025-09-10',
      endDate: '2025-09-20',
      destination: 'Tokyo, Japan → Kyoto, Japan → Osaka, Japan',
      budget: 3200,
      progress: 30,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
      sections: 8,
      completedSections: 2,
      host: 'Antique Quail',
      rating: 4.9,
      highlights: ['Shibuya Crossing', 'Fushimi Inari', 'Dotonbori']
    },
    {
      id: 3,
      title: 'Bali Beach Getaway',
      status: 'upcoming',
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      destination: 'Seminyak, Bali → Ubud, Bali → Nusa Dua',
      budget: 2100,
      progress: 45,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop',
      sections: 6,
      completedSections: 3,
      host: 'Animated Wolf',
      rating: 4.7,
      highlights: ['Tanah Lot', 'Rice Terraces', 'Beach Clubs']
    },
    {
      id: 4,
      title: 'Swiss Alps Winter Retreat',
      status: 'completed',
      startDate: '2025-01-10',
      endDate: '2025-01-18',
      destination: 'Zermatt, Switzerland → Interlaken → Lucerne',
      budget: 5600,
      progress: 100,
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=400&fit=crop',
      sections: 10,
      completedSections: 10,
      host: 'Magnificent Jackal',
      rating: 5.0,
      highlights: ['Matterhorn', 'Jungfraujoch', 'Lake Lucerne']
    },
    {
      id: 5,
      title: 'Thailand Explorer',
      status: 'completed',
      startDate: '2024-12-01',
      endDate: '2024-12-12',
      destination: 'Bangkok → Chiang Mai → Phuket',
      budget: 2800,
      progress: 100,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop',
      sections: 9,
      completedSections: 9,
      host: 'Blue Gazelle',
      rating: 4.6,
      highlights: ['Grand Palace', 'Elephant Sanctuary', 'Phi Phi Islands']
    }
  ];

  // Get counts for each status
  const getStatusCount = (status) => {
    return trips.filter(trip => trip.status === status).length;
  };

  // Filter trips based on active tab
  const getFilteredTrips = () => {
    let filtered = trips.filter(trip => trip.status === activeTab);
    
    if (searchQuery) {
      filtered = filtered.filter(trip => 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.host.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeGroup === 'destination') {
      filtered = [...filtered].sort((a, b) => a.destination.localeCompare(b.destination));
    } else if (activeGroup === 'budget') {
      filtered = [...filtered].sort((a, b) => a.budget - b.budget);
    } else if (activeGroup === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    
    if (sortBy === 'budget_low') {
      filtered = [...filtered].sort((a, b) => a.budget - b.budget);
    } else if (sortBy === 'budget_high') {
      filtered = [...filtered].sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortBy === 'progress') {
      filtered = [...filtered].sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
  };

  const filteredTrips = getFilteredTrips();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ongoing':
        return <PlayCircle className="w-5 h-5 text-green-400" />;
      case 'upcoming':
        return <ClockIcon className="w-5 h-5 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing':
        return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'upcoming':
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 'completed':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'ongoing': return 'In Progress';
      case 'upcoming': return 'Coming Soon';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'ongoing', label: 'Ongoing', icon: PlayCircle, count: getStatusCount('ongoing') },
    { id: 'upcoming', label: 'Upcoming', icon: ClockIcon, count: getStatusCount('upcoming') },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: getStatusCount('completed') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1a] via-[#030518] to-[#01010f]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6C63FF] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF6584] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
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
                <Sparkles size={14} />
                Magnificent Jackal
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-playfair bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            My Travel Diary
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track and relive all your adventures in one beautiful place
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-2">
              <Globe size={20} className="text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-white">{trips.length}</p>
            <p className="text-gray-400 text-sm">Total Trips</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-2">
              <MapPin size={20} className="text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-400 text-sm">Countries Visited</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
              <Award size={20} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">45</p>
            <p className="text-gray-400 text-sm">Activities Done</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
              <Heart size={20} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">4.8</p>
            <p className="text-gray-400 text-sm">Avg Rating</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search trips by title, destination, or host..."
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
                  <option value="destination">Destination</option>
                  <option value="budget">Budget</option>
                  <option value="date">Date</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="date">Sort by: Date</option>
                  <option value="budget_low">Budget: Low to High</option>
                  <option value="budget_high">Budget: High to Low</option>
                  <option value="progress">Progress</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-[rgba(255,255,255,0.05)] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-500/30 text-white' : 'text-gray-400'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-500/30 text-white' : 'text-gray-400'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-3 mb-8 border-b border-[rgba(255,255,255,0.1)] pb-4 flex-wrap"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-[rgba(255,255,255,0.1)]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Trip Cards - Grid View */}
        {viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredTrips.length === 0 ? (
                <motion.div variants={itemVariants} className="col-span-full">
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No trips found in this category</p>
                    <button
                      onClick={() => navigate('/create-trip')}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white hover:scale-105 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                      Plan a New Trip
                    </button>
                  </div>
                </motion.div>
              ) : (
                filteredTrips.map((trip, idx) => (
                  <motion.div
                    key={trip.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r ${getStatusColor(trip.status)} backdrop-blur-sm flex items-center gap-1.5`}>
                        {getStatusIcon(trip.status)}
                        <span className="text-xs font-medium text-white/90">{getStatusLabel(trip.status)}</span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1 text-white">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{trip.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin size={14} className="text-pink-400 flex-shrink-0" />
                        <p className="text-gray-400 text-xs line-clamp-1">{trip.destination}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Calendar size={14} className="text-indigo-400" />
                          <span className="text-xs">{formatDate(trip.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <DollarSign size={14} className="text-green-400" />
                          <span className="text-xs">${trip.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {trip.status !== 'completed' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{trip.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${trip.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {trip.status === 'completed' && (
                        <div className="flex items-center gap-1.5 text-green-400 text-xs mb-3">
                          <CheckCircle size={12} />
                          <span>Completed • {trip.sections} sections</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Users size={12} />
                        <span>Host: {trip.host}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredTrips.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-12">
                  <div className="glass-card rounded-2xl p-12">
                    <p className="text-gray-400 text-lg">No trips found in this category</p>
                    <button
                      onClick={() => navigate('/create-trip')}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white hover:scale-105 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                      Plan a New Trip
                    </button>
                  </div>
                </motion.div>
              ) : (
                filteredTrips.map((trip, idx) => (
                  <motion.div
                    key={trip.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-32 overflow-hidden">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
                              {trip.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin size={14} className="text-pink-400" />
                              <p className="text-gray-400 text-sm">{trip.destination}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(trip.status)} flex items-center gap-1.5`}>
                            {getStatusIcon(trip.status)}
                            <span className="text-xs font-medium capitalize text-white/80">{trip.status}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Calendar size={14} className="text-indigo-400" />
                            <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <DollarSign size={14} className="text-green-400" />
                            <span>${trip.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Users size={14} className="text-pink-400" />
                            <span>{trip.host}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-400">{trip.rating}</span>
                          </div>
                        </div>
                        
                        {trip.status !== 'completed' && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{trip.progress}% • {trip.completedSections}/{trip.sections} sections</span>
                            </div>
                            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
                                style={{ width: `${trip.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30 opacity-0 group-hover:opacity-100 transition-all md:relative md:opacity-100 md:self-center md:mr-6" />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Plan New Trip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/create-trip')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-2xl font-bold text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Plan a New Trip
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(15, 25, 45, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(108, 99, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          border-color: rgba(108, 99, 255, 0.6);
          box-shadow: 0 20px 40px rgba(108, 99, 255, 0.1);
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
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

export default ItineraryViewPage;