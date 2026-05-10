import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight,
  Plane,
  Hotel,
  Mountain,
  Coffee,
  CheckCircle,
  PlayCircle,
  Clock as ClockIcon,
  Star,
  MoreHorizontal,
  TrendingUp,
  DollarSign
} from 'lucide-react';
// import SimpleNavbar from './SimpleNavbar';

const ItineraryViewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');

  const trips = {
    ongoing: [
      {
        id: 1,
        title: 'European Summer Adventure',
        destination: 'Paris, France → Rome, Italy',
        startDate: '2025-06-15',
        endDate: '2025-06-28',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop',
        progress: 65,
        budget: 4850,
        companions: 3,
        activities: ['Eiffel Tower', 'Colosseum', 'Louvre Museum'],
        host: 'Magnificent Jackal'
      },
      {
        id: 2,
        title: 'Bali Getaway',
        destination: 'Seminyak, Bali',
        startDate: '2025-06-10',
        endDate: '2025-06-20',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
        progress: 40,
        budget: 2100,
        companions: 2,
        activities: ['Surfing', 'Tegallalang Rice Terraces', 'Ubud Monkey Forest'],
        host: 'Magnificent Jackal'
      }
    ],
    upcoming: [
      {
        id: 3,
        title: 'Japanese Cherry Blossom Tour',
        destination: 'Tokyo, Kyoto, Osaka',
        startDate: '2026-03-20',
        endDate: '2026-04-05',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop',
        daysLeft: 280,
        budget: 5200,
        companions: 4,
        activities: ['Cherry Blossom Viewing', 'Mount Fuji', 'Osaka Castle'],
        host: 'Magenta Zebra'
      },
      {
        id: 4,
        title: 'Swiss Alps Winter Escape',
        destination: 'Interlaken, Zermatt',
        startDate: '2025-12-15',
        endDate: '2025-12-28',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=500&fit=crop',
        daysLeft: 180,
        budget: 3800,
        companions: 2,
        activities: ['Skiing', 'Jungfraujoch', 'Matterhorn'],
        host: 'Magenta Zebra'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Thailand Island Hopping',
        destination: 'Phuket, Krabi, Koh Samui',
        startDate: '2024-12-10',
        endDate: '2024-12-20',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop',
        completedDate: '2024-12-20',
        budget: 2900,
        companions: 3,
        activities: ['Phi Phi Islands', 'James Bond Island', 'Elephant Sanctuary'],
        host: 'Antique Quail',
        rating: 4.8
      },
      {
        id: 6,
        title: 'Venice & Amalfi Coast',
        destination: 'Venice, Florence, Amalfi',
        startDate: '2024-09-05',
        endDate: '2024-09-15',
        image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=500&fit=crop',
        completedDate: '2024-09-15',
        budget: 3500,
        companions: 2,
        activities: ['Gondola Ride', 'Pompeii', 'Path of the Gods'],
        host: 'Animated Wolf',
        rating: 4.9
      },
      {
        id: 7,
        title: 'Greek Island Odyssey',
        destination: 'Santorini, Mykonos, Crete',
        startDate: '2024-07-10',
        endDate: '2024-07-22',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=500&fit=crop',
        completedDate: '2024-07-22',
        budget: 4200,
        companions: 4,
        activities: ['Oia Sunset', 'Delos Island', 'Knossos Palace'],
        host: 'Animated Wolf',
        rating: 4.7
      }
    ]
  };

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
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'upcoming':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'completed':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default:
        return '';
    }
  };

  const tabs = [
    { id: 'ongoing', label: 'Ongoing', icon: PlayCircle, count: trips.ongoing.length },
    { id: 'upcoming', label: 'Upcoming', icon: ClockIcon, count: trips.upcoming.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: trips.completed.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      {/* <SimpleNavbar /> */}
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#FF6584] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="glass-effect px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium">✨ Your Journey Collection</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            My Trips
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Track your adventures, past and future
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="glass-effect rounded-xl p-4 text-center hover-glow transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PlayCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/60 text-sm">Ongoing</span>
            </div>
            <p className="text-2xl font-bold text-white">{trips.ongoing.length}</p>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center hover-glow transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ClockIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-white/60 text-sm">Upcoming</span>
            </div>
            <p className="text-2xl font-bold text-white">{trips.upcoming.length}</p>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center hover-glow transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-white/60 text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold text-white">{trips.completed.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                  : 'glass-effect text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Trip Cards */}
        <div className="space-y-6">
          {trips[activeTab].map((trip, index) => (
            <div
              key={trip.id}
              className={`group glass-effect rounded-2xl overflow-hidden hover-glow transition-all duration-300 border ${getStatusColor(activeTab)}`}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/3 h-48 lg:h-auto relative overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full">
                    {getStatusIcon(activeTab)}
                    <span className="text-white text-xs font-medium capitalize">{activeTab}</span>
                  </div>
                  
                  {/* Host Badge */}
                  <div className="absolute bottom-4 left-4 glass-effect px-3 py-1.5 rounded-full">
                    <span className="text-white/80 text-xs">{trip.host}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                        <MapPin className="w-4 h-4 text-[#FF6584]" />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <MoreHorizontal className="w-4 h-4 text-white/60" />
                    </button>
                  </div>

                  {/* Short Overview */}
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    A {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))}-day journey 
                    through {trip.destination.split(' → ').length > 1 ? 'multiple cities' : 'this beautiful destination'} 
                    with {trip.companions} companions.
                  </p>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4 text-[#6C63FF]" />
                      <span>
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {activeTab !== 'completed' && ` → ${new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span>${trip.budget.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Users className="w-4 h-4 text-[#6C63FF]" />
                      <span>{trip.companions} travelers</span>
                    </div>

                    {activeTab === 'upcoming' && trip.daysLeft && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <ClockIcon className="w-4 h-4 text-yellow-400" />
                        <span>{trip.daysLeft} days left</span>
                      </div>
                    )}

                    {activeTab === 'ongoing' && trip.progress && (
                      <div className="flex items-center gap-2 text-white/60 text-sm col-span-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span>Progress: {trip.progress}%</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-full"
                            style={{ width: `${trip.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'completed' && trip.rating && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{trip.rating} / 5.0</span>
                      </div>
                    )}
                  </div>

                  {/* Activity Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.activities.slice(0, 3).map((activity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/60">
                        {activity}
                      </span>
                    ))}
                    {trip.activities.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/40">
                        +{trip.activities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate('/itinerary')}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white font-medium hover:scale-105 transition-all duration-300"
                    >
                      {activeTab === 'ongoing' ? 'Continue Journey' : activeTab === 'upcoming' ? 'View Details' : 'Relive Memories'}
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-all">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {trips[activeTab].length === 0 && (
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Plane className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No {activeTab} trips yet</h3>
              <p className="text-white/50 text-sm mb-4">
                {activeTab === 'ongoing' && "You don't have any ongoing trips at the moment."}
                {activeTab === 'upcoming' && "Plan your next adventure to see it here!"}
                {activeTab === 'completed' && "Complete a trip to see it in your collection."}
              </p>
              <button 
                onClick={() => navigate('/create-trip')}
                className="px-6 py-2 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-xl text-white font-medium hover:scale-105 transition-all"
              >
                Plan a Trip
              </button>
            </div>
          </div>
        )}
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