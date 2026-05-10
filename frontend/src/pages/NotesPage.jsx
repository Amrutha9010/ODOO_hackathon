import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  BookOpen,
  X,
  Save,
  Clock
} from 'lucide-react'

const NotesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('category')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [selectedTrip, setSelectedTrip] = useState('paris-rome')
  const [activeTab, setActiveTab] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    day: '',
    date: '',
    stop: ''
  })

  // Notes data structure
  const [notesData, setNotesData] = useState({
    trips: {
      'paris-rome': {
        name: 'Paris & Rome Adventure',
        notes: [
          {
            id: 1,
            title: 'Hotel check-in details - Paris',
            content: 'Check in after 2 PM, room 302, breakfast included (7–10 AM). Early check-in available for an extra fee.',
            day: 1,
            date: '2025-06-15',
            stop: 'Paris',
            createdAt: '2025-06-10'
          },
          {
            id: 2,
            title: 'Eiffel Tower Ticket Pickup',
            content: 'Pick up tickets at the south pillar entrance. Arrive 30 minutes before scheduled time. Skip-the-line passes included.',
            day: 2,
            date: '2025-06-16',
            stop: 'Paris',
            createdAt: '2025-06-10'
          },
          {
            id: 3,
            title: 'Train to Rome - Important',
            content: 'High-speed train from Gare de Lyon at 9:45 AM. Platform 12. Seat numbers: 14A, 14B. Arrives Rome Termini at 1:30 PM.',
            day: 4,
            date: '2025-06-18',
            stop: 'Transfer',
            createdAt: '2025-06-11'
          },
          {
            id: 4,
            title: 'Rome Colosseum Underground Tour',
            content: 'Meeting point at Colosseum metro station exit. Tour starts at 10 AM sharp. Bring ID for verification.',
            day: 5,
            date: '2025-06-19',
            stop: 'Rome',
            createdAt: '2025-06-11'
          },
          {
            id: 5,
            title: 'Vatican Museums Reservation',
            content: 'Reservation confirmed for 2 PM. Dress code: covered shoulders and knees. Audio guide included.',
            day: 6,
            date: '2025-06-20',
            stop: 'Rome',
            createdAt: '2025-06-12'
          }
        ]
      },
      'tokyo-seoul': {
        name: 'Tokyo & Seoul Adventure',
        notes: [
          {
            id: 6,
            title: 'Shinjuku Hotel Check-in',
            content: 'Hotel Sunroute Plaza Shinjuku. Check-in from 3 PM. Requested high floor with city view.',
            day: 1,
            date: '2025-09-10',
            stop: 'Tokyo',
            createdAt: '2025-06-10'
          }
        ]
      }
    }
  })

  const currentTrip = notesData.trips[selectedTrip]
  const allNotes = currentTrip.notes

  // Filter notes based on search, filter, and active tab
  const getFilteredNotes = () => {
    let filtered = [...allNotes]
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Tab filter
    if (activeTab === 'day') {
      // Group by day - we'll handle display differently
      return filtered
    } else if (activeTab === 'stop') {
      // Group by stop - we'll handle display differently
      return filtered
    }
    
    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    
    return filtered
  }

  // Group notes by day
  const getNotesByDay = () => {
    const grouped = {}
    allNotes.forEach(note => {
      if (!grouped[note.day]) {
        grouped[note.day] = []
      }
      grouped[note.day].push(note)
    })
    return grouped
  }

  // Group notes by stop
  const getNotesByStop = () => {
    const grouped = {}
    allNotes.forEach(note => {
      if (!grouped[note.stop]) {
        grouped[note.stop] = []
      }
      grouped[note.stop].push(note)
    })
    return grouped
  }

  const filteredNotes = getFilteredNotes()
  const notesByDay = getNotesByDay()
  const notesByStop = getNotesByStop()

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const newId = Date.now()
      const updatedNotes = {
        ...notesData,
        trips: {
          ...notesData.trips,
          [selectedTrip]: {
            ...notesData.trips[selectedTrip],
            notes: [
              ...notesData.trips[selectedTrip].notes,
              {
                id: newId,
                title: newNote.title,
                content: newNote.content,
                day: parseInt(newNote.day) || 1,
                date: newNote.date || new Date().toISOString().split('T')[0],
                stop: newNote.stop || 'General',
                createdAt: new Date().toISOString().split('T')[0]
              }
            ]
          }
        }
      }
      setNotesData(updatedNotes)
      setNewNote({ title: '', content: '', day: '', date: '', stop: '' })
      setShowAddModal(false)
    }
  }

  const updateNote = () => {
    if (editingNote && editingNote.title && editingNote.content) {
      const updatedNotes = {
        ...notesData,
        trips: {
          ...notesData.trips,
          [selectedTrip]: {
            ...notesData.trips[selectedTrip],
            notes: notesData.trips[selectedTrip].notes.map(note =>
              note.id === editingNote.id ? editingNote : note
            )
          }
        }
      }
      setNotesData(updatedNotes)
      setEditingNote(null)
    }
  }

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = {
        ...notesData,
        trips: {
          ...notesData.trips,
          [selectedTrip]: {
            ...notesData.trips[selectedTrip],
            notes: notesData.trips[selectedTrip].notes.filter(note => note.id !== id)
          }
        }
      }
      setNotesData(updatedNotes)
    }
  }

  const filterOptions = [
    { id: 'all', label: 'All Notes' },
    { id: 'recent', label: 'Recent' }
  ]

  const groupOptions = [
    { id: 'category', label: 'Group by Category' },
    { id: 'date', label: 'Group by Date' }
  ]

  const sortOptions = [
    { id: 'date', label: 'Sort by Date' },
    { id: 'title', label: 'Sort by Title' },
    { id: 'newest', label: 'Newest First' }
  ]

  const tripOptions = [
    { id: 'paris-rome', label: 'Paris & Rome Adventure' },
    { id: 'tokyo-seoul', label: 'Tokyo & Seoul Adventure' }
  ]

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'day', label: 'By Day' },
    { id: 'stop', label: 'By Stop' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
          Trip Notes
        </h1>
        <p className="text-gray-400 mt-2">Capture memories, ideas, and important details for your journey</p>
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
              placeholder="Search notes by title or content..."
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

      {/* Notes Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        {/* Header with Trip Selector and Add Note Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Trip Notes</h2>
            
            {/* Trip Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {tripOptions.map(option => (
                  <option key={option.id} value={option.id}>Trip: {option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-medium text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <Plus size={18} />
            Add Note
          </motion.button>
        </div>

        {/* Notes Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[rgba(255,255,255,0.1)]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notes List Section */}
        {activeTab === 'all' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300"
                >
                  {editingNote?.id === note.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingNote.title}
                        onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Note title"
                      />
                      <textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                        rows="3"
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Note content"
                      />
                      <div className="flex gap-2">
                        <button onClick={updateNote} className="px-3 py-1.5 bg-indigo-600 rounded-lg text-white text-sm flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        <button onClick={() => setEditingNote(null)} className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] rounded-lg text-gray-400 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg mb-2">{note.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">{note.content}</p>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <span className="flex items-center gap-1 text-gray-400">
                              <Clock size={12} />
                              Day {note.day}
                            </span>
                            <span className="flex items-center gap-1 text-gray-400">
                              <Calendar size={12} />
                              {formatDate(note.date)}
                            </span>
                            <span className="flex items-center gap-1 text-gray-400">
                              <MapPin size={12} />
                              {note.stop}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingNote(note)}
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-indigo-500/20 transition-all"
                          >
                            <Edit2 size={16} className="text-gray-400 hover:text-indigo-400" />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* By Day View */}
        {activeTab === 'day' && (
          <div className="space-y-6">
            {Object.entries(notesByDay).sort((a,b) => a[0] - b[0]).map(([day, dayNotes]) => (
              <div key={day}>
                <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                  <Calendar size={18} />
                  Day {day}
                </h3>
                <div className="space-y-3 ml-4">
                  {dayNotes.map(note => (
                    <motion.div
                      key={note.id}
                      variants={itemVariants}
                      className="glass-card rounded-xl p-4 hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{note.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{note.content}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <MapPin size={12} />
                            <span>{note.stop}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => deleteNote(note.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                            <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* By Stop View */}
        {activeTab === 'stop' && (
          <div className="space-y-6">
            {Object.entries(notesByStop).map(([stop, stopNotes]) => (
              <div key={stop}>
                <h3 className="text-lg font-semibold text-pink-400 mb-3 flex items-center gap-2">
                  <MapPin size={18} />
                  {stop}
                </h3>
                <div className="space-y-3 ml-4">
                  {stopNotes.map(note => (
                    <motion.div
                      key={note.id}
                      variants={itemVariants}
                      className="glass-card rounded-xl p-4 hover:border-pink-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{note.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{note.content}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>Day {note.day} • {formatDate(note.date)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => deleteNote(note.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                            <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Note Modal */}
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
              className="glass-card rounded-2xl max-w-lg w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add New Note</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="e.g., Hotel check-in details"
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows="4"
                    placeholder="Write your notes here..."
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Day Number</label>
                    <input
                      type="number"
                      value={newNote.day}
                      onChange={(e) => setNewNote({ ...newNote, day: e.target.value })}
                      placeholder="e.g., 1"
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Stop/City</label>
                    <input
                      type="text"
                      value={newNote.stop}
                      onChange={(e) => setNewNote({ ...newNote, stop: e.target.value })}
                      placeholder="e.g., Paris"
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
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
                  onClick={addNote}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotesPage