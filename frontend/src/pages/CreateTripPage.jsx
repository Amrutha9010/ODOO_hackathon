import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import SimpleNavbar from './SimpleNavbar';
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  ChevronRight,
  Plane,
  Utensils,
  Mountain,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [place, setPlace] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    { id: 1, name: 'Morning Yoga at Sunrise', icon: Sun, time: '6:00 AM', duration: '1 hour', type: 'Wellness' },
    { id: 2, name: 'Coffee Tasting Tour', icon: Coffee, time: '10:00 AM', duration: '2 hours', type: 'Food' },
    { id: 3, name: 'Mountain Hiking', icon: Mountain, time: '1:00 PM', duration: '3 hours', type: 'Adventure' },
    { id: 4, name: 'Local Market Exploration', icon: MapPin, time: '4:00 PM', duration: '2 hours', type: 'Culture' },
    { id: 5, name: 'Sunset Dinner Cruise', icon: Utensils, time: '6:30 PM', duration: '2.5 hours', type: 'Dining' },
    { id: 6, name: 'Stargazing Experience', icon: Moon, time: '9:00 PM', duration: '1.5 hours', type: 'Night' },
  ];

  const userSuggestions = [
    { name: 'Proud Horse', role: 'Adventure Guide', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop' },
    { name: 'Venerated Ibex', role: 'Travel Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Accomplished Eel', role: 'Local Specialist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { name: 'Trustworthy Scorpion', role: 'Activity Curator', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Stunning Sparrow', role: 'Wellness Coach', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { name: 'Silky Caterpillar', role: 'Guest', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  ];

  const handleCreateTrip = () => {
    // Handle trip creation logic
    console.log('Creating trip:', { startDate, endDate, place });
    // You can add logic here to save the trip and navigate back
    // navigate('/dashboard'); // Uncomment if you want to go back after creating
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
     
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#FF6584] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

     <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      {/* <SimpleNavbar /> */}
        {/* Main Content */}
        <div className="relative max-w-[95%] mx-auto px-4 py-4">
          {/* Title Section */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <div className="glass-effect px-4 py-2 rounded-full">
                <span className="text-[#FF6584] font-medium">✨ Plan a new trip</span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
              Create Your Journey
            </h2>
            <p className="text-white/60 text-lg">
              Let's craft an unforgettable adventure tailored just for you
            </p>
          </div>

          {/* Trip Form - Vertical Layout */}
          <div className=" max-w-2xl mx-auto glass-effect rounded-3xl p-8 mb-10">
            <div className="flex flex-col gap-6">
              {/* Start Date */}
              <div className="group">
                <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6C63FF]" />
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-all focus:shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="group">
                <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6C63FF]" />
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-all focus:shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                  />
                </div>
              </div>

              {/* Select a Place */}
              <div className="group">
                <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#6C63FF]" />
                  Select a Place
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Where would you like to go?"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-all focus:shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                  />
                </div>
              </div>
            </div>

            {/* Create Trip Button */}
            <button
              onClick={handleCreateTrip}
              className="mt-8 w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span className="relative">Create My Trip</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Suggestions Section */}
          {showSuggestions && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#FF6584]" />
                    Suggestions for Planning Activities
                  </h3>
                  <p className="text-white/40 text-sm mt-1">Proud Horse • Venerated Ibex • Akshay</p>
                </div>
                <button className="text-[#6C63FF] hover:text-[#FF6584] transition-colors text-sm">
                  View all suggestions →
                </button>
              </div>

              {/* Activity Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <div
                      key={suggestion.id}
                      className="glass-effect rounded-xl p-4 hover-glow transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#6C63FF]/20 group-hover:bg-[#6C63FF]/30 transition-colors">
                          <Icon className="w-5 h-5 text-[#6C63FF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-[#6C63FF] transition-colors">
                            {suggestion.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {suggestion.time}
                            </span>
                            <span>{suggestion.duration}</span>
                            <span className="px-2 py-0.5 rounded-full bg-white/10">
                              {suggestion.type}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#6C63FF] transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* User Suggestions */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#6C63FF]" />
                  Travel Experts
                  <span className="text-sm text-white/40 font-normal ml-2">Silky Caterpillar • Guest User</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {userSuggestions.map((user, index) => (
                    <div
                      key={index}
                      className="glass-effect rounded-xl p-4 text-center hover-glow transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative mb-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] p-0.5 group-hover:scale-105 transition-transform">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        {user.role === 'Guest' && (
                          <div className="absolute -top-1 -right-1">
                            <div className="w-5 h-5 rounded-full bg-[#FF6584] flex items-center justify-center">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-white text-sm group-hover:text-[#6C63FF] transition-colors">
                        {user.name}
                      </h4>
                      <p className="text-white/40 text-xs mt-1">{user.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          transform: translateY(-4px);
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.6;
          cursor: pointer;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CreateTripPage;