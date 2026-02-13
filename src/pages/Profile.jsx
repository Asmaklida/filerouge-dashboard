import { useState } from 'react';

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Admin',
    email: 'admin@football.com',
    phone: '+1 (555) 123-4567',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePersonalInfoUpdate = () => alert('Personal information updated!');
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };
  const handleAvatarChange = () => alert('Avatar upload feature coming soon!');

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-6`}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Profile</h1>
          <p className="text-gray-500">Manage your account settings and security preferences</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="lg:flex gap-6">

          {/* Left - Avatar & Info */}
          <div className="lg:w-1/3 space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow text-center`}>
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-400 mx-auto flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 bg-white text-red-500 p-2 rounded-full shadow hover:scale-110 transition"
                >
                  Change
                </button>
              </div>
              <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
              <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-full mt-1 text-sm uppercase">Administrator</span>

              <div className="mt-6 space-y-3">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-xl`}>
                  <p className="text-xs uppercase text-gray-500">Email Address</p>
                  <p className="font-semibold">{personalInfo.email}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-xl`}>
                  <p className="text-xs uppercase text-gray-500">Phone Number</p>
                  <p className="font-semibold">{personalInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Forms */}
          <div className="lg:w-2/3 space-y-6">

            {/* Personal Info Form */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow`}>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border`}
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                />
                <input
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border`}
                  placeholder="Email Address"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
                <input
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border`}
                  placeholder="Phone Number"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePersonalInfoUpdate}
                  className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-900 transition"
                >
                  Update Profile
                </button>
              </div>
            </div>

            {/* Password Form */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow`}>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border w-full`}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border w-full`}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} p-3 rounded-xl border w-full`}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePasswordChange}
                  className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-900 transition"
                >
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
