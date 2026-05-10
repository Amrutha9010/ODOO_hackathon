import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Link,
  Save,
  X,
  Camera,
  Upload,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Smartphone,
  LogOut,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Edit2
} from 'lucide-react';

import { FaGithub, FaGoogle } from 'react-icons/fa';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    fullName: 'John Doe',
    email: 'john.doe@traveloop.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    language: 'English'
  });
  const [editingAccount, setEditingAccount] = useState(false);
  const [tempAccount, setTempAccount] = useState({ ...accountSettings });

  // Profile Settings State
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [bio, setBio] = useState('Passionate traveler exploring the world one city at a time. Love discovering hidden gems and experiencing local cultures.');
  const [travelPreferences, setTravelPreferences] = useState('Luxury & Adventure');

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    tripReminders: true,
    budgetAlerts: true,
    communityUpdates: false,
    activityNotifications: true
  });

  // Security Settings State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Appearance Settings State
  const [appearance, setAppearance] = useState({
    darkMode: true,
    themeColor: 'indigo',
    fontSize: 'medium'
  });

  // Connected Accounts State
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    github: false
  });

  const themeColors = [
    { id: 'indigo', color: '#6C63FF' },
    { id: 'pink', color: '#FF6584' },
    { id: 'purple', color: '#8B5CF6' },
    { id: 'blue', color: '#3B82F6' },
    { id: 'green', color: '#10B981' }
  ];

  const fontSizes = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' }
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Hindi'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil'
  ];

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'profile', label: 'Profile Settings', icon: Settings },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'security', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'connected', label: 'Connected Accounts', icon: Link }
  ];

  const handleAccountSave = () => {
    setAccountSettings({ ...tempAccount });
    setEditingAccount(false);
  };

  const handleAccountCancel = () => {
    setTempAccount({ ...accountSettings });
    setEditingAccount(false);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    console.log('Password changed');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

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
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-white via-indigo-300 to-violet-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your account preferences and application settings.</p>
        </motion.div>

        {/* Settings Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="glass-card rounded-2xl p-2 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-white border-l-2 border-indigo-500'
                        : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <Icon size={18} className={activeTab === tab.id ? 'text-indigo-400' : ''} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Settings Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            {/* Account Settings Section */}
            {activeTab === 'account' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                
                {editingAccount ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                        <input
                          type="text"
                          value={tempAccount.fullName}
                          onChange={(e) => setTempAccount({ ...tempAccount, fullName: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                        <input
                          type="email"
                          value={tempAccount.email}
                          onChange={(e) => setTempAccount({ ...tempAccount, email: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={tempAccount.phone}
                          onChange={(e) => setTempAccount({ ...tempAccount, phone: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Country</label>
                        <select
                          value={tempAccount.country}
                          onChange={(e) => setTempAccount({ ...tempAccount, country: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        >
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Language Preference</label>
                        <select
                          value={tempAccount.language}
                          onChange={(e) => setTempAccount({ ...tempAccount, language: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        >
                          {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button onClick={handleAccountSave} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium flex items-center gap-2">
                        <Save size={16} /> Save Changes
                      </button>
                      <button onClick={handleAccountCancel} className="px-6 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-gray-400 font-medium flex items-center gap-2">
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Full Name</p>
                        <p className="text-white font-medium">{accountSettings.fullName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email Address</p>
                        <p className="text-white font-medium">{accountSettings.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone Number</p>
                        <p className="text-white font-medium">{accountSettings.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Country</p>
                        <p className="text-white font-medium">{accountSettings.country}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Language Preference</p>
                        <p className="text-white font-medium">{accountSettings.language}</p>
                      </div>
                    </div>
                    <button onClick={() => setEditingAccount(true)} className="px-6 py-2 bg-indigo-600/20 border border-indigo-500/50 rounded-xl text-indigo-400 font-medium hover:bg-indigo-600/30 transition-all">
                      Edit Account Details
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Profile Settings Section */}
            {activeTab === 'profile' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  {/* Profile Picture Upload */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Profile Picture</label>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-[rgba(15,25,45,0.8)] flex items-center justify-center overflow-hidden">
                            {profilePreview ? (
                              <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <User size={40} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors"
                        >
                          <Camera size={14} className="text-white" />
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                      </div>
                      {profilePreview && (
                        <button onClick={removeProfileImage} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm flex items-center gap-1">
                          <Trash2 size={14} /> Remove Photo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Bio / About Me</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows="4"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Travel Preferences */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Travel Preferences</label>
                    <select
                      value={travelPreferences}
                      onChange={(e) => setTravelPreferences(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option>Luxury & Adventure</option>
                      <option>Budget Backpacking</option>
                      <option>Family Travel</option>
                      <option>Solo Adventure</option>
                      <option>Cultural Explorer</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium">Update Profile</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notification Settings Section */}
            {activeTab === 'notifications' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-gray-500 text-sm">Receive email updates about your trips</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('emailNotifications')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${notifications.emailNotifications ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Trip Reminders</p>
                      <p className="text-gray-500 text-sm">Get reminded about upcoming trips</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('tripReminders')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${notifications.tripReminders ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${notifications.tripReminders ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Budget Alerts</p>
                      <p className="text-gray-500 text-sm">Get notified when you exceed budget</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('budgetAlerts')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${notifications.budgetAlerts ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${notifications.budgetAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Community Updates</p>
                      <p className="text-gray-500 text-sm">News and updates from the community</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('communityUpdates')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${notifications.communityUpdates ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${notifications.communityUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Activity Notifications</p>
                      <p className="text-gray-500 text-sm">Updates about your planned activities</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('activityNotifications')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${notifications.activityNotifications ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${notifications.activityNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Privacy & Security Section */}
            {activeTab === 'security' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Lock size={20} className="text-indigo-400" />
                      <div className="text-left">
                        <p className="text-white font-medium">Change Password</p>
                        <p className="text-gray-500 text-sm">Update your account password</p>
                      </div>
                    </div>
                    <Edit2 size={16} className="text-gray-400" />
                  </button>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-500 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${twoFactorAuth ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <p className="text-white font-medium mb-3">Login Activity</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-300">Chrome on Windows</p>
                          <p className="text-gray-500 text-xs">New York, USA • Today at 2:30 PM</p>
                        </div>
                        <span className="text-green-400 text-xs">Current session</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-300">Safari on iPhone</p>
                          <p className="text-gray-500 text-xs">New York, USA • Yesterday at 8:15 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium hover:bg-red-500/20 transition-all">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* Appearance Settings Section */}
            {activeTab === 'appearance' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-gray-500 text-sm">Toggle between light and dark theme</p>
                    </div>
                    <button
                      onClick={() => setAppearance({ ...appearance, darkMode: !appearance.darkMode })}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${appearance.darkMode ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 transform flex items-center justify-center ${appearance.darkMode ? 'translate-x-6' : 'translate-x-1'}`}>
                        {appearance.darkMode ? <Moon size={10} /> : <Sun size={10} />}
                      </div>
                    </button>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Theme Color</label>
                    <div className="flex gap-3">
                      {themeColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setAppearance({ ...appearance, themeColor: color.id })}
                          className={`w-8 h-8 rounded-full transition-all duration-300 ${appearance.themeColor === color.id ? 'ring-2 ring-white scale-110' : ''}`}
                          style={{ backgroundColor: color.color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Font Size</label>
                    <div className="flex gap-3">
                      {fontSizes.map(size => (
                        <button
                          key={size.id}
                          onClick={() => setAppearance({ ...appearance, fontSize: size.id })}
                          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            appearance.fontSize === size.id
                              ? 'bg-indigo-600 text-white'
                              : 'bg-[rgba(255,255,255,0.05)] text-gray-400 hover:bg-[rgba(255,255,255,0.1)]'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Connected Accounts Section */}
            {activeTab === 'connected' && (
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Connected Accounts</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DB4437]/20 flex items-center justify-center">
                        <Chrome size={20} className="text-[#DB4437]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Google Account</p>
                        <p className="text-gray-500 text-sm">Connected as john.doe@gmail.com</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-all">
                      Disconnect
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#333]/20 flex items-center justify-center">
                        <Github size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">GitHub Account</p>
                        <p className="text-gray-500 text-sm">Not connected</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/50 text-indigo-400 text-sm font-medium hover:bg-indigo-600/30 transition-all">
                      Connect
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/20 text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={handlePasswordChange} className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium">Update Password</button>
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
        
        .glass-navbar {
          background: rgba(8, 12, 25, 0.8);
          backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;