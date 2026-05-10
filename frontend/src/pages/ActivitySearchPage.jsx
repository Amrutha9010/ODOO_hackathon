import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Tag,
  AlertCircle,
  Star,
  Save,
  X,
  CheckCircle,
  Clock as ClockIcon
} from 'lucide-react';

const ActivitiesPlanner = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  
  // Selection states
  const [selectedTrip, setSelectedTrip] = useState('europe');
  const [selectedCity, setSelectedCity] = useState('paris');
  const [selectedDay, setSelectedDay] = useState('day3');
  
  // Activity Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [costRange, setCostRange] = useState('all');
  
  // Form state for adding/editing activities
  const [formData, setFormData] = useState({
    name: '',
    type: 'sightseeing',
    location: '',
    date: '',
    time: '',
    cost: '',
    priority: 'medium',
    notes: ''
  });
  
  const [showForm, setShowForm] = useState(false);

  // Sample activities data
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Eiffel Tower Visit',
      type: 'sightseeing',
      location: 'Paris, France',
      date: '2025-06-16',
      time: '10:00 AM',
      cost: 25,
      priority: 'high',
      notes: 'Skip-the-line tickets recommended. Best views at sunset.',
      trip: 'europe',
      city: 'paris',
      day: 'day3'
    },
    {
      id: 2,
      name: 'Louvre Museum Tour',
      type: 'culture',
      location: 'Paris, France',
      date: '2025-06-17',
      time: '2:00 PM',
      cost: 18,
      priority: 'high',
      notes: 'Book tickets in advance. Audio guide available.',
      trip: 'europe',
      city: 'paris',
      day: 'day3'
    },
    {
      id: 3,
      name: 'Seine River Cruise',
      type: 'leisure',
      location: 'Paris, France',
      date: '2025-06-16',
      time: '7:00 PM',
      cost: 15,
      priority: 'medium',
      notes: 'Evening cruise with dinner option available.',
      trip: 'europe',
      city: 'paris',
      day: 'day3'
    },
    {
      id: 4,
      name: 'Colosseum Tour',
      type: 'sightseeing',
      location: 'Rome, Italy',
      date: '2025-06-19',
      time: '11:00 AM',
      cost: 20,
      priority: 'high',
      notes: 'Underground tour requires advance booking.',
      trip: 'europe',
      city: 'rome',
      day: 'day5'
    },
    {
      id: 5,
      name: 'Pasta Making Class',
      type: 'food',
      location: 'Rome, Italy',
      date: '2025-06-20',
      time: '4:00 PM',
      cost: 65,
      priority: 'medium',
      notes: 'Includes lunch and wine tasting.',
      trip: 'europe',
      city: 'rome',
      day: 'day5'
    }
  ]);

  // Sample data for dropdowns
  const trips = [
    { id: 'europe', name: 'Europe Adventure' },
    { id: 'asia', name: 'Asia Explorer' }
  ];

  const cities = {
    europe: [
      { id: 'paris', name: 'Paris' },
      { id: 'rome', name: 'Rome' },
      { id: 'barcelona', name: 'Barcelona' }
    ],
    asia: [
      { id: 'tokyo', name: 'Tokyo' },
      { id: 'seoul', name: 'Seoul' },
      { id: 'bangkok', name: 'Bangkok' }
    ]
  };

  const days = [
    { id: 'day1', name: 'Day 1: Arrival' },
    { id: 'day2', name: 'Day 2: Exploration' },
    { id: 'day3', name: 'Day 3: Culture' },
    { id: 'day4', name: 'Day 4: Adventure' },
    { id: 'day5', name: 'Day 5: Relaxation' }
  ];

  const activityTypes = [
    { id: 'sightseeing', label: 'Sightseeing', color: 'indigo' },
    { id: 'food', label: 'Food & Dining', color: 'pink' },
    { id: 'culture', label: 'Culture', color: 'purple' },
    { id: 'adventure', label: 'Adventure', color: 'orange' },
    { id: 'leisure', label: 'Leisure', color: 'green' },
    { id: 'shopping', label: 'Shopping', color: 'yellow' }
  ];

  const priorities = [
    { id: 'high', label: 'High Priority', color: 'red' },
    { id: 'medium', label: 'Medium Priority', color: 'yellow' },
    { id: 'low', label: 'Low Priority', color: 'green' }
  ];

  const costRanges = [
    { id: 'all', label: 'All' },
    { id: 'free', label: 'Free' },
    { id: 'under50', label: 'Under $50' },
    { id: '50to100', label: '$50 - $100' },
    { id: 'over100', label: 'Over $100' }
  ];

  // Filter activities based on selections
  const getFilteredActivities = () => {
    let filtered = activities.filter(activity => 
      activity.trip === selectedTrip && 
      activity.city === selectedCity &&
      activity.day === selectedDay
    );
    
    if (searchQuery) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.notes.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === typeFilter);
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(activity => activity.priority === priorityFilter);
    }
    
    if (dateFilter) {
      filtered = filtered.filter(activity => activity.date === dateFilter);
    }
    
    if (costRange !== 'all') {
      filtered = filtered.filter(activity => {
        if (costRange === 'free') return activity.cost === 0;
        if (costRange === 'under50') return activity.cost < 50;
        if (costRange === '50to100') return activity.cost >= 50 && activity.cost <= 100;
        if (costRange === 'over100') return activity.cost > 100;
        return true;
      });
    }
    
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'cost') {
      filtered.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  const handleAddActivity = () => {
    if (formData.name && formData.location) {
      const newActivity = {
        id: Date.now(),
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        trip: selectedTrip,
        city: selectedCity,
        day: selectedDay
      };
      setActivities([...activities, newActivity]);
      resetForm();
      setShowForm(false);
    }
  };

  const handleUpdateActivity = () => {
    if (editingActivity && formData.name) {
      setActivities(activities.map(activity =>
        activity.id === editingActivity.id
          ? { ...formData, id: activity.id, trip: selectedTrip, city: selectedCity, day: selectedDay, cost: parseFloat(formData.cost) || 0 }
          : activity
      ));
      setEditingActivity(null);
      resetForm();
    }
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const handleEditClick = (activity) => {
    setEditingActivity(activity);
    setFormData({
      name: activity.name,
      type: activity.type,
      location: activity.location,
      date: activity.date,
      time: activity.time,
      cost: activity.cost.toString(),
      priority: activity.priority,
      notes: activity.notes
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'sightseeing',
      location: '',
      date: '',
      time: '',
      cost: '',
      priority: 'medium',
      notes: ''
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeLabel = (typeId) => {
    return activityTypes.find(t => t.id === typeId)?.label || typeId;
  };

  const groupOptions = [
    { id: 'all', label: 'Group by: All' },
    { id: 'type', label: 'Activity Type' },
    { id: 'priority', label: 'Priority' }
  ];

  const filterOptions = [
    { id: 'all', label: 'Filter: All' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' }
  ];

  const sortOptions = [
    { id: 'date', label: 'Sort by: Date' },
    { id: 'cost', label: 'Cost' },
    { id: 'name', label: 'Name' }
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-5 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities..."
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <select
                value={activeGroup}
                onChange={(e) => setActiveGroup(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {groupOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
            </div>
            
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-white via-indigo-300 to-violet-300 bg-clip-text text-transparent">
            Activities Planner
          </h1>
          <p className="text-gray-400 mt-2">Organize and manage your travel activities across different cities and trip days.</p>
        </motion.div>

        {/* Trip & City Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-5 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Trip</label>
              <select
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id}>{trip.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                {cities[selectedTrip]?.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Day</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                {days.map(day => (
                  <option key={day.id} value={day.id}>{day.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Activity Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-5 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Activity Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Types</option>
                {activityTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>{priority.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Cost Range</label>
              <select
                value={costRange}
                onChange={(e) => setCostRange(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                {costRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Add Activity Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <button
            onClick={() => {
              resetForm();
              setEditingActivity(null);
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            {showForm ? 'Hide Form' : 'Add New Activity'}
          </button>
        </motion.div>

        {/* Activity Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-6 mb-8 overflow-hidden"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Activity Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g., Eiffel Tower Visit"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Activity Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {activityTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="City, Venue"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Estimated Cost ($)</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority.id} value={priority.id}>{priority.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="3"
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                    placeholder="Additional notes, booking details, tips..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={editingActivity ? handleUpdateActivity : handleAddActivity}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium flex items-center gap-2"
                >
                  <Save size={16} />
                  {editingActivity ? 'Update Activity' : 'Add Activity'}
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                    setEditingActivity(null);
                  }}
                  className="px-6 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-gray-400 font-medium flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activities List Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredActivities.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-12">
                <div className="glass-card rounded-2xl p-8">
                  <Calendar size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No activities found</p>
                  <p className="text-gray-500 text-sm mt-2">Add your first activity using the form above</p>
                </div>
              </motion.div>
            ) : (
              filteredActivities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
                            {activity.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 mt-1">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Tag size={12} className="text-indigo-400" />
                              {getTypeLabel(activity.type)}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin size={12} className="text-pink-400" />
                              {activity.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(activity.priority)}`}>
                            {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Calendar size={14} className="text-indigo-400" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Clock size={14} className="text-indigo-400" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <DollarSign size={14} className="text-green-400" />
                          <span>${activity.cost}</span>
                        </div>
                      </div>
                      
                      {activity.notes && (
                        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                          📝 {activity.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(activity)}
                        className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-indigo-500/20 transition-all"
                      >
                        <Edit2 size={16} className="text-gray-400 hover:text-indigo-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
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
        }
        
        .glass-navbar {
          background: rgba(8, 12, 25, 0.8);
          backdrop-filter: blur(16px);
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

export default ActivitiesPlanner;