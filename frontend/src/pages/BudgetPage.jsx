import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Users,
  CreditCard,
  Download,
  FileText,
  CheckCircle,
  DollarSign,
  TrendingUp,
  PieChart,
  Hotel,
  Plane,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  Smartphone
} from 'lucide-react'

const BudgetPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  // Budget data
  const budgetData = {
    tripInfo: {
      title: 'European Summer Adventure',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      startDate: 'June 15, 2025',
      endDate: 'June 28, 2025',
      cities: 4,
      creator: 'John Doe',
      invoiceId: 'INV-2025-001234',
      generatedDate: 'March 15, 2025'
    },
    travelers: ['John Doe', 'Sarah Johnson', 'Michael Chen', 'Emma Wilson'],
    paymentStatus: 'Pending',
    budget: {
      total: 12500,
      spent: 8450,
      remaining: 4050,
      percentage: 68
    },
    expenses: [
      {
        id: 1,
        category: 'Hotel',
        description: 'Le Meurice - Paris Stay',
        details: '5 nights, Deluxe Suite with Eiffel Tower View',
        unitCost: 450,
        quantity: 5,
        amount: 2250
      },
      {
        id: 2,
        category: 'Hotel',
        description: 'Hotel Eden - Rome Stay',
        details: '4 nights, Executive Room',
        unitCost: 380,
        quantity: 4,
        amount: 1520
      },
      {
        id: 3,
        category: 'Travel',
        description: 'Flight tickets - JFK to CDG',
        details: 'Delta Airlines, Business Class',
        unitCost: 1800,
        quantity: 4,
        amount: 7200
      },
      {
        id: 4,
        category: 'Travel',
        description: 'Train tickets - Paris to Rome',
        details: 'Trenitalia, Premium Class',
        unitCost: 180,
        quantity: 4,
        amount: 720
      },
      {
        id: 5,
        category: 'Activities',
        description: 'Eiffel Tower & Seine Cruise',
        details: 'Skip-the-line tickets + dinner cruise',
        unitCost: 250,
        quantity: 4,
        amount: 1000
      },
      {
        id: 6,
        category: 'Activities',
        description: 'Colosseum Underground Tour',
        details: 'Guided tour with arena access',
        unitCost: 85,
        quantity: 4,
        amount: 340
      },
      {
        id: 7,
        category: 'Transport',
        description: 'Private transfers - Airport to Hotel',
        details: 'Round trip transfers in Paris & Rome',
        unitCost: 120,
        quantity: 2,
        amount: 240
      },
      {
        id: 8,
        category: 'Dining',
        description: 'Welcome dinner reservation',
        details: 'Michelin star restaurant - Paris',
        unitCost: 180,
        quantity: 4,
        amount: 720
      }
    ]
  }

  // Calculate summary
  const subtotal = budgetData.expenses.reduce((sum, item) => sum + item.amount, 0)
  const taxRate = 0.08
  const tax = subtotal * taxRate
  const discount = 250
  const grandTotal = subtotal + tax - discount

  const filterOptions = [
    { id: 'all', label: 'All Categories' },
    { id: 'Hotel', label: 'Hotel' },
    { id: 'Travel', label: 'Travel' },
    { id: 'Activities', label: 'Activities' },
    { id: 'Transport', label: 'Transport' },
    { id: 'Dining', label: 'Dining' }
  ]

  const sortOptions = [
    { id: 'date', label: 'Sort by Date' },
    { id: 'category', label: 'Sort by Category' },
    { id: 'amount', label: 'Sort by Amount' }
  ]

  const filteredExpenses = budgetData.expenses.filter(expense => {
    if (searchQuery) {
      return expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    }
    if (activeFilter !== 'all') {
      return expense.category === activeFilter
    }
    return true
  })

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Hotel': return Hotel
      case 'Travel': return Plane
      case 'Activities': return Ticket
      case 'Transport': return Car
      case 'Dining': return Utensils
      default: return ShoppingBag
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Top Navigation Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link 
          to="/my-trips" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors glass-card px-4 py-2 rounded-xl"
        >
          <ArrowLeft size={18} />
          Back to My Trips
        </Link>
      </motion.div>

      {/* Search & Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoices by description or category..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {filterOptions.map(option => (
                <option key={option.id} value={option.id}>Filter: {option.label}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Sort Button */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>Sort: {option.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Overview Section - Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Trip Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={budgetData.tripInfo.image} 
                alt={budgetData.tripInfo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,25,0.9)] to-transparent" />
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trip Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Trip Information</h3>
                  <h2 className="text-2xl font-bold text-white mb-2">{budgetData.tripInfo.title}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar size={14} className="text-indigo-400" />
                      <span>{budgetData.tripInfo.startDate} - {budgetData.tripInfo.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin size={14} className="text-indigo-400" />
                      <span>{budgetData.tripInfo.cities} Cities</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <User size={14} className="text-indigo-400" />
                      <span>Created by: {budgetData.tripInfo.creator}</span>
                    </div>
                  </div>
                </div>

                {/* Budget Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Budget Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget ID:</span>
                      <span className="text-white font-medium">{budgetData.tripInfo.budgetId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Generated Date:</span>
                      <span className="text-white">{budgetData.tripInfo.generatedDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Payment Status:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        budgetData.paymentStatus === 'Pending' 
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {budgetData.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Traveler Details */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Traveler Details</h3>
                  <div className="flex flex-wrap gap-2">
                    {budgetData.travelers.map((traveler, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] rounded-lg text-sm text-gray-300">
                        <Users size={12} />
                        {traveler}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Budget Insights Side Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <PieChart size={20} className="text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Budget Insights</h3>
            </div>

            {/* Circular Progress Chart Placeholder */}
            <div className="relative flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * budgetData.budget.percentage / 100} ${2 * Math.PI * 56}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#FF6584" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{budgetData.budget.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Budget</span>
                <span className="text-white font-semibold">${budgetData.budget.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Spent</span>
                <span className="text-pink-400 font-semibold">${budgetData.budget.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,255,255,0.1)]">
                <span className="text-gray-400 text-sm">Remaining</span>
                <span className="text-green-400 font-semibold">${budgetData.budget.remaining.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/budget">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-5 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-all"
              >
                View Full Budget
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Expense Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Expense Details</h3>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.1)]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">#</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Category</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Description</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Quantity/Details</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Unit Cost</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, idx) => {
                const Icon = getCategoryIcon(expense.category)
                return (
                  <motion.tr
                    key={expense.id}
                    variants={itemVariants}
                    className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-400 text-sm">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <Icon size={12} className="text-indigo-400" />
                        </div>
                        <span className="text-white text-sm">{expense.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white text-sm">{expense.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{expense.details}</td>
                    <td className="py-3 px-4 text-right text-gray-300 text-sm">${expense.unitCost}</td>
                    <td className="py-3 px-4 text-right text-white font-medium text-sm">${expense.amount.toLocaleString()}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredExpenses.map((expense, idx) => {
            const Icon = getCategoryIcon(expense.category)
            return (
              <motion.div
                key={expense.id}
                variants={itemVariants}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <Icon size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{expense.description}</p>
                      <p className="text-gray-500 text-xs">{expense.category}</p>
                    </div>
                  </div>
                  <span className="text-white font-semibold">${expense.amount.toLocaleString()}</span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-400">{expense.details}</p>
                  <p className="text-gray-500">Unit Cost: ${expense.unitCost}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Billing Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end"
      >
        <div className="glass-card rounded-2xl p-6 w-full md:w-96">
          <h3 className="text-lg font-bold text-white mb-4">Billing Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Subtotal</span>
              <span className="text-white">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Tax (8%)</span>
              <span className="text-white">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Discount</span>
              <span className="text-green-400">-${discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.1)] pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Grand Total</span>
                <span className="text-indigo-400 font-bold text-xl">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4 justify-center pt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] rounded-xl font-medium text-white transition-all duration-300"
        >
          <Download size={18} />
          Download Invoice
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] rounded-xl font-medium text-white transition-all duration-300"
        >
          <FileText size={18} />
          Export as PDF
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-medium text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        >
          <CheckCircle size={18} />
          Mark as Paid
        </motion.button>
      </motion.div>
    </div>
  )
}

export default BudgetPage