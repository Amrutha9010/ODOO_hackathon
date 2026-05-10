import React, { useState } from 'react';
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
  XCircle
} from 'lucide-react';
// import SimpleNavbar from './SimpleNavbar';

const ItineraryViewPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('ongoing');

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
      host: 'Krishna Kumar Gupta'
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
      host: 'Antique Quail'
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
      host: 'Animated Wolf'
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
      host: 'Magnificent Jackal'
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
      host: 'Blue Gazelle'
    }
  ];

  // Filter trips based on active tab
  const getFilteredTrips = () => {
    let filtered = trips.filter(trip => trip.status === activeTab);
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(trip => 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.host.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Group by
    if (activeGroup === 'destination') {
      // Grouping logic - for display we'll just sort by destination
      filtered = [...filtered].sort((a, b) => a.destination.localeCompare(b.destination));
    } else if (activeGroup === 'budget') {
      filtered = [...filtered].sort((a, b) => a.budget - b.budget);
    } else if (activeGroup === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    
    // Sort by
    if (sortBy === 'budget_low') {
      filtered = [...filtered].sort((a, b) => a.budget - b.budget);
    } else if (sortBy === 'budget_high') {
      filtered = [...filtered].sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortBy === 'progress') {
      filtered = [...filtered].sort((a, b) => b.progress - a.progress);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      {/* <SimpleNavbar /> */}
      
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
              <span className="text-[#FF6584] font-medium">✨ Magnificent Jackal</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            My Trips
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Track and manage all your adventures in one place
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search trips by title, destination, or host..."
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
                  <option value="destination" style={{ color: '#6C63FF' }}>Destination</option>
                  <option value="budget" style={{ color: '#6C63FF' }}>Budget</option>
                  <option value="date" style={{ color: '#6C63FF' }}>Date</option>
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
                  <option value="date" style={{ color: '#6C63FF' }}>Sort by: Date</option>
                  <option value="budget_low" style={{ color: '#6C63FF' }}>Budget: Low to High</option>
                  <option value="budget_high" style={{ color: '#6C63FF' }}>Budget: High to Low</option>
                  <option value="progress" style={{ color: '#6C63FF' }}>Progress</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6C63FF' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          {['ongoing', 'upcoming', 'completed'].map((tab) => {
            const counts = trips.filter(t => t.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {getStatusIcon(tab)}
                <span className="capitalize">{tab}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {counts}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trip Cards */}
        <div className="space-y-6">
          {filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-effect rounded-2xl p-8">
                <p className="text-white/60 text-lg">No trips found in this category</p>
                <button
                  onClick={() => navigate('/create-trip')}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-xl text-white hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  Plan a New Trip
                </button>
              </div>
            </div>
          ) : (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="group glass-effect rounded-2xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/trip/${trip.id}`)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Trip Image */}
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Trip Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-[#FF6584]" />
                          <p className="text-white/60 text-sm">{trip.destination}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(trip.status)} flex items-center gap-2`}>
                        {getStatusIcon(trip.status)}
                        <span className="text-xs font-medium capitalize text-white/80">{trip.status}</span>
                      </div>
                    </div>
                    
                    {/* Short Overview */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {trip.status === 'ongoing' && `✨ Your adventure is in progress! ${trip.completedSections} out of ${trip.sections} sections completed. Next stop: ${trip.destination.split('→')[0]}`}
                      {trip.status === 'upcoming' && `📅 Get ready for an amazing journey! Trip starts on ${new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                      {trip.status === 'completed' && `🎉 What an incredible journey! You've completed ${trip.sections} sections across ${trip.destination}`}
                    </p>
                    
                    {/* Trip Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4 text-[#6C63FF]" />
                        <span>{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span>${trip.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Users className="w-4 h-4 text-[#FF6584]" />
                        <span>{trip.host}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span>{trip.completedSections}/{trip.sections} done</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {trip.status !== 'completed' && (
                      <div>
                        <div className="flex justify-between text-sm text-white/60 mb-1">
                          <span>Progress</span>
                          <span>{trip.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-full transition-all duration-500"
                            style={{ width: `${trip.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {trip.status === 'completed' && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed successfully! View your memories →</span>
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30 opacity-0 group-hover:opacity-100 transition-all md:relative md:opacity-100 md:self-center md:mr-6" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Plan New Trip Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/create-trip')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative">Plan a New Trip</span>
          </button>
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

export default ItineraryViewPage;