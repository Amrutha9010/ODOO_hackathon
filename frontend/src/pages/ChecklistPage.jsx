import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronDown,
  CheckSquare,
  Square,
  Plus,
  RotateCcw,
  Share2,
  Package,
  FileText,
  Shirt,
  Smartphone,
  Briefcase,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

const ChecklistPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('category')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [selectedTrip, setSelectedTrip] = useState('paris-rome')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemCategory, setNewItemCategory] = useState('documents')

  // Checklist data structure
  const [checklistData, setChecklistData] = useState({
    trips: {
      'paris-rome': {
        name: 'Paris & Rome Adventure',
        items: {
          documents: {
            name: 'Documents',
            icon: FileText,
            items: [
              { id: 1, name: 'Passport', packed: false },
              { id: 2, name: 'Flight Tickets (printed)', packed: true },
              { id: 3, name: 'Travel Insurance', packed: false },
              { id: 4, name: 'Hotel Booking Confirmation', packed: false }
            ]
          },
          clothing: {
            name: 'Clothing',
            icon: Shirt,
            items: [
              { id: 5, name: 'Casual Shirts', packed: false },
              { id: 6, name: 'Trousers / Jeans', packed: false },
              { id: 7, name: 'Comfortable Walking Shoes', packed: true },
              { id: 8, name: 'Light Jacket / Windbreaker', packed: false }
            ]
          },
          electronics: {
            name: 'Electronics',
            icon: Smartphone,
            items: [
              { id: 9, name: 'Phone Charger', packed: false },
              { id: 10, name: 'Universal Power Adapter', packed: false },
              { id: 11, name: 'Earphones / Headphones', packed: true }
            ]
          }
        }
      },
      'tokyo-seoul': {
        name: 'Tokyo & Seoul Adventure',
        items: {
          documents: {
            name: 'Documents',
            icon: FileText,
            items: [
              { id: 12, name: 'Passport', packed: false },
              { id: 13, name: 'Flight Tickets', packed: false },
              { id: 14, name: 'Travel Insurance', packed: false },
              { id: 15, name: 'Visa Documents', packed: false }
            ]
          },
          clothing: {
            name: 'Clothing',
            icon: Shirt,
            items: [
              { id: 16, name: 'Casual Shirts', packed: false },
              { id: 17, name: 'Trousers / Jeans', packed: false },
              { id: 18, name: 'Comfortable Walking Shoes', packed: false },
              { id: 19, name: 'Winter Jacket', packed: false }
            ]
          },
          electronics: {
            name: 'Electronics',
            icon: Smartphone,
            items: [
              { id: 20, name: 'Phone Charger', packed: false },
              { id: 21, name: 'Universal Power Adapter', packed: false },
              { id: 22, name: 'Portable Wi-Fi', packed: false }
            ]
          }
        }
      }
    }
  })

  const currentTrip = checklistData.trips[selectedTrip]
  const categories = currentTrip.items

  // Calculate packed statistics
  const calculateStats = () => {
    let totalItems = 0
    let packedItems = 0
    
    Object.values(categories).forEach(category => {
      category.items.forEach(item => {
        totalItems++
        if (item.packed) packedItems++
      })
    })
    
    return { totalItems, packedItems, percentage: totalItems > 0 ? (packedItems / totalItems) * 100 : 0 }
  }

  const stats = calculateStats()

  const toggleItemPacked = (categoryKey, itemId) => {
    setChecklistData(prev => ({
      ...prev,
      trips: {
        ...prev.trips,
        [selectedTrip]: {
          ...prev.trips[selectedTrip],
          items: {
            ...prev.trips[selectedTrip].items,
            [categoryKey]: {
              ...prev.trips[selectedTrip].items[categoryKey],
              items: prev.trips[selectedTrip].items[categoryKey].items.map(item =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
              )
            }
          }
        }
      }
    }))
  }

  const getCategoryPackedCount = (category) => {
    const items = category.items
    const packed = items.filter(item => item.packed).length
    return `${packed}/${items.length}`
  }

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all checklist items?')) {
      const newData = { ...checklistData }
      Object.keys(newData.trips[selectedTrip].items).forEach(categoryKey => {
        newData.trips[selectedTrip].items[categoryKey].items = newData.trips[selectedTrip].items[categoryKey].items.map(item => ({
          ...item,
          packed: false
        }))
      })
      setChecklistData(newData)
    }
  }

  const shareChecklist = () => {
    const stats = calculateStats()
    const message = `My packing progress for ${currentTrip.name}: ${stats.packedItems}/${stats.totalItems} items packed (${Math.round(stats.percentage)}%)`
    alert(`Share this checklist:\n\n${message}`)
  }

  const addNewItem = () => {
    if (newItemName.trim()) {
      const newId = Date.now()
      setChecklistData(prev => ({
        ...prev,
        trips: {
          ...prev.trips,
          [selectedTrip]: {
            ...prev.trips[selectedTrip],
            items: {
              ...prev.trips[selectedTrip].items,
              [newItemCategory]: {
                ...prev.trips[selectedTrip].items[newItemCategory],
                items: [
                  ...prev.trips[selectedTrip].items[newItemCategory].items,
                  { id: newId, name: newItemName, packed: false }
                ]
              }
            }
          }
        }
      }))
      setNewItemName('')
      setShowAddModal(false)
    }
  }

  const filterOptions = [
    { id: 'all', label: 'All Items' },
    { id: 'packed', label: 'Packed' },
    { id: 'unpacked', label: 'Unpacked' }
  ]

  const groupOptions = [
    { id: 'category', label: 'Group by Category' },
    { id: 'status', label: 'Group by Status' }
  ]

  const sortOptions = [
    { id: 'default', label: 'Default Order' },
    { id: 'az', label: 'A to Z' },
    { id: 'za', label: 'Z to A' }
  ]

  const tripOptions = [
    { id: 'paris-rome', label: 'Paris & Rome Adventure' },
    { id: 'tokyo-seoul', label: 'Tokyo & Seoul Adventure' }
  ]

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
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gradient-hero">
          Packing Checklist
        </h1>
        <p className="text-gray-400 mt-2">Never forget an essential item for your journey</p>
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
              placeholder="Search checklist items..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>

          {/* Group By Button */}
          <div className="relative">
            <select
              value={activeGroup}
              onChange={(e) => setActiveGroup(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {groupOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
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

          {/* Sort By Button */}
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

      {/* Packing Checklist Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        {/* Header with Trip Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Packing Checklist</h2>
          
          {/* Trip Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer min-w-[200px]"
            >
              {tripOptions.map(option => (
                <option key={option.id} value={option.id}>Trip: {option.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">{stats.packedItems}/{stats.totalItems} items packed</span>
            <span className="text-indigo-400 text-sm font-medium">{Math.round(stats.percentage)}%</span>
          </div>
          <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            />
          </div>
        </div>

        {/* Checklist Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {Object.entries(categories).map(([categoryKey, category]) => {
            const CategoryIcon = category.icon
            const packedCount = category.items.filter(item => item.packed).length
            const totalCount = category.items.length
            
            let filteredItems = category.items
            if (activeFilter === 'packed') {
              filteredItems = filteredItems.filter(item => item.packed === true)
            } else if (activeFilter === 'unpacked') {
              filteredItems = filteredItems.filter(item => item.packed === false)
            }
            
            if (searchQuery) {
              filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            }
            
            if (filteredItems.length === 0 && searchQuery) return null
            
            return (
              <motion.div
                key={categoryKey}
                variants={itemVariants}
                className="glass-card rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <CategoryIcon size={16} className="text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-white">{category.name}</h3>
                  </div>
                  <span className="text-sm text-gray-400">{packedCount}/{totalCount}</span>
                </div>
                
                {/* Checklist Items */}
                <div className="p-4 space-y-3">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-all cursor-pointer group"
                      onClick={() => toggleItemPacked(categoryKey, item.id)}
                    >
                      <div className="flex-shrink-0">
                        {item.packed ? (
                          <CheckSquare size={20} className="text-green-400" />
                        ) : (
                          <Square size={20} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                        )}
                      </div>
                      <span className={`text-sm ${item.packed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>

      {/* Bottom Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-medium text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
        >
          <Plus size={18} />
          Add Item to Checklist
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetAll}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] rounded-xl font-medium text-white transition-all duration-300"
        >
          <RotateCcw size={18} />
          Reset All
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareChecklist}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] rounded-xl font-medium text-white transition-all duration-300"
        >
          <Share2 size={18} />
          Share Checklist
        </motion.button>
      </motion.div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Add New Item</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g., Sunscreen, Travel Pillow"
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="documents">Documents</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-white/20 text-gray-400 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewItem}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChecklistPage