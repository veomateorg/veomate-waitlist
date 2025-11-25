'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CompleteSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+1',
    phoneNumber: '',
    companyName: '',
    role: '',
    teamSize: '',
    hearAbout: '',
  });

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (!emailParam) {
      router.push('/');
    } else {
      setEmail(emailParam);
    }
  }, [searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call - Here you would send all data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Complete signup data:', {
      email,
      ...formData
    });

    setLoading(false);

    // Redirect to success page or show success message
    router.push('/welcome');
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#73AFEA] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#7374EA] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#AD73EA] opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#73AFEA] via-[#7374EA] to-[#AD73EA] bg-clip-text text-transparent">
            VeoMate
          </h1>
          <p className="text-xl text-gray-600">Almost there! Complete your profile</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <p className="text-sm text-gray-600">Signing up with</p>
            <p className="text-lg font-semibold text-gray-800">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+55">🇧🇷 +55</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+64">🇳🇿 +64</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+46">🇸🇪 +46</option>
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                  placeholder="123-456-7890"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                placeholder="Acme Inc."
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Your Role (Optional)
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
                placeholder="Product Manager"
              />
            </div>

            {/* Team Size */}
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                Team Size (Optional)
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
              >
                <option value="">Select team size</option>
                <option value="1">Just me</option>
                <option value="2-10">2-10 people</option>
                <option value="11-50">11-50 people</option>
                <option value="51-200">51-200 people</option>
                <option value="201+">201+ people</option>
              </select>
            </div>

            {/* How did you hear about us */}
            <div>
              <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about VeoMate? (Optional)
              </label>
              <select
                id="hearAbout"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#7374EA] focus:outline-none text-gray-800 transition-colors"
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="search-engine">Search Engine</option>
                <option value="friend">Friend or Colleague</option>
                <option value="blog">Blog or Article</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#73AFEA] via-[#7374EA] to-[#AD73EA] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
