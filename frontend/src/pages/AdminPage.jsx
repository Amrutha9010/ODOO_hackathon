import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Users,
  Building2,
  Activity,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart,
  Shield,
  MapPin
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeCategory, setActiveCategory] = useState('users');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Pie chart data - User Distribution
  const pieData = [
    { name: 'Active Users', value: 8450, color: '#6C63FF' },
    { name: 'New Users (30d)', value: 2150, color: '#FF6584' },
    { name: 'Inactive Users', value: 1400, color: '#4B5563' },
  ];

  // Line chart data - User Growth
  const lineData = [
    { month: 'Jan', users: 3200, trips: 1800 },
    { month: 'Feb', users: 3800, trips: 2100 },
    { month: 'Mar', users: 4500, trips: 2600 },
    { month: 'Apr', users: 5200, trips: 3100 },
    { month: 'May', users: 6100, trips: 3800 },
    { month: 'Jun', users: 7200, trips: 4500 },
    { month: 'Jul', users: 8450, trips: 5200 },
  ];

  // Bar chart data - Popular Cities
  const barData = [
    { city: 'Paris', trips: 1250, activities: 890 },
    { city: 'Tokyo', trips: 980, activities: 720 },
    { city: 'Rome', trips: 870, activities: 650 },
    { city: 'Bali', trips: 750, activities: 580 },
    { city: 'NYC', trips: 690, activities: 520 },
  ];

  // Area chart data - Activity Trends
  const areaData = [
    { month: 'Jan', hiking: 420, cultural: 380, dining: 450 },
    { month: 'Feb', hiking: 450, cultural: 420, dining: 480 },
    { month: 'Mar', hiking: 520, cultural: 480, dining: 520 },
    { month: 'Apr', hiking: 580, cultural: 540, dining: 580 },
    { month: 'May', hiking: 650, cultural: 610, dining: 650 },
    { month: 'Jun', hiking: 720, cultural: 680, dining: 720 },
    { month: 'Jul', hiking: 890, cultural: 750, dining: 780 },
  ];

  const adminCategories = [
    { id: 'users', label: 'Manage Users', icon: Users, color: 'indigo' },
    { id: 'cities', label: 'Popular Cities', icon: Building2, color: 'pink' },
    { id: 'activities', label: 'Popular Activities', icon: Activity, color: 'green' },
    { id: 'analytics', label: 'User Trends and Analytics', icon: TrendingUp, color: 'purple' },
  ];

  const groupOptions = [
    { id: 'all', label: 'Group by: All' },
    { id: 'category', label: 'Category' },
    { id: 'date', label: 'Date' }
  ];

  const filterOptions = [
    { id: 'all', label: 'Filter: All' },
    { id: 'users', label: 'Users' },
    { id: 'trips', label: 'Trips' },
    { id: 'activities', label: 'Activities' }
  ];

  const sortOptions = [
    { id: 'date', label: 'Sort by: Date' },
    { id: 'name', label: 'Name' },
    { id: 'count', label: 'Popularity' }
  ];

  // Summary stats
  const summaryStats = {
    totalUsers: 8450,
    activeTrips: 320,
    totalActivities: 12500,
    userGrowth: 23.5
  };

  // Dynamic content based on active category
  const getCategoryTitle = () => {
    switch(activeCategory) {
      case 'users': return 'User Management Analytics';
      case 'cities': return 'City Popularity Analytics';
      case 'activities': return 'Activity Trends Analytics';
      case 'analytics': return 'User Trends Analytics';
      default: return 'Analytics Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1a] via-[#030518] to-[#01010f]">
      {/* Top Navbar */}
      <nav className="glass-navbar border-b border-[rgba(108,99,255,0.2)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
            Traveloop Admin
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <span className="text-white text-sm font-semibold">AD</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
                  <User size={16} /> Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
                  <Settings size={16} /> Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

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
                placeholder="Search users, cities, activities..."
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

        {/* Admin Category Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {adminCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`glass-card rounded-xl p-4 text-center transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'hover:border-indigo-500/50'
                }`}
              >
                <Icon size={24} className={`mx-auto mb-2 ${
                  activeCategory === category.id ? 'text-indigo-400' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  activeCategory === category.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {category.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Analytics Section & Side Panel Row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Analytics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">{getCategoryTitle()}</h2>
              
              {/* Summary Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-400">{summaryStats.totalUsers.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Total Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-400">{summaryStats.activeTrips}</p>
                  <p className="text-gray-400 text-sm">Active Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{summaryStats.totalActivities.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Total Activities</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">+{summaryStats.userGrowth}%</p>
                  <p className="text-gray-400 text-sm">User Growth</p>
                </div>
              </div>

              {/* Charts Grid - All charts always visible as requested */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <PieChartIcon size={16} className="text-indigo-400" />
                    User Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,25,45,0.9)',
                          border: '1px solid rgba(108,99,255,0.3)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart - User Growth */}
                <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <LineChart size={16} className="text-pink-400" />
                    User & Trip Growth
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <ReLineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,25,45,0.9)',
                          border: '1px solid rgba(108,99,255,0.3)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#6C63FF" strokeWidth={2} />
                      <Line type="monotone" dataKey="trips" stroke="#FF6584" strokeWidth={2} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart - Popular Cities */}
                <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <BarChart3 size={16} className="text-green-400" />
                    Popular Cities
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <ReBarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="city" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,25,45,0.9)',
                          border: '1px solid rgba(108,99,255,0.3)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="trips" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="activities" fill="#FF6584" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>

                {/* Area Chart - Activity Trends */}
                <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-purple-400" />
                    Activity Trends
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={areaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,25,45,0.9)',
                          border: '1px solid rgba(108,99,255,0.3)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="hiking" stackId="1" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="cultural" stackId="1" stroke="#FF6584" fill="#FF6584" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="dining" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Admin Sections</h3>
              </div>
              
              <div className="space-y-4">
                {/* Manage Users Section */}
                <div className="border-b border-[rgba(255,255,255,0.1)] pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={14} className="text-indigo-400" />
                    <h4 className="text-white font-medium text-sm">Manage Users</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    View, edit, and manage user accounts. Monitor user activity, trip history, and account status.
                  </p>
                </div>

                {/* Popular Cities Section */}
                <div className="border-b border-[rgba(255,255,255,0.1)] pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-pink-400" />
                    <h4 className="text-white font-medium text-sm">Popular Cities</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Track most visited destinations, city rankings, and travel patterns across different regions.
                  </p>
                </div>

                {/* Popular Activities Section */}
                <div className="border-b border-[rgba(255,255,255,0.1)] pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={14} className="text-green-400" />
                    <h4 className="text-white font-medium text-sm">Popular Activities</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Analyze trending activities, user preferences, and seasonal activity popularity.
                  </p>
                </div>

                {/* User Trends Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} className="text-purple-400" />
                    <h4 className="text-white font-medium text-sm">User Trends & Analytics</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    View user growth metrics, engagement analytics, and platform performance indicators.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <div className="bg-[rgba(108,99,255,0.1)] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Platform Status</span>
                    <span className="text-green-400">● Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
      `}</style>
    </div>
  );
};

export default AdminPage;