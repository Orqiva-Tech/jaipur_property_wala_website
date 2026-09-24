import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { enquiryService } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedProperty: 'General Enquiry',
    preferredLocation: 'Jaipur',
    budget: 'Any',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await enquiryService.create({
        ...formData,
        source: 'Contact Us Page'
      });
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        interestedProperty: 'General Enquiry',
        preferredLocation: 'Jaipur',
        budget: 'Any',
        message: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please call us directly at 9828226566.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Official Registered Advisory Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-950 leading-tight">
            Connect With Jaipur Property Wala
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
            Reach out to our senior plot advisors for complimentary site inspection cabs, verified JDA scheme layouts, or instant bank loan estimates.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Office Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Address */}
            <div className="bg-white p-7 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800 block">
                    Head Office
                  </span>
                  <h3 className="text-lg font-bold font-editorial text-forest-950">
                    Jagatpura Branch
                  </h3>
                </div>
              </div>

              <p className="text-sm text-charcoal-800 leading-relaxed font-medium">
                Livasha Flat No.301, Mahal Yojna, Mahal Road Scheme, Jagatpura, Jaipur - 302017, Rajasthan.
              </p>

              <div className="pt-2 text-xs text-charcoal-700 space-y-1.5 border-t border-stone-200 font-medium">
                <p>• Landmark: Near Bombay Hospital Scheme & Ring Road</p>
                <p>• Distance: 15 mins from Jaipur International Airport</p>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="bg-white p-7 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800 block">
                    Direct Helpline
                  </span>
                  <h3 className="text-lg font-bold font-editorial text-forest-950">
                    Call or WhatsApp
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-charcoal-600 block font-semibold">Primary Contact:</span>
                  <a href="tel:9828226566" className="text-lg font-extrabold text-forest-950 hover:text-gold-700 transition-colors">
                    9828226566
                  </a>
                </div>

                <div>
                  <span className="text-xs text-charcoal-600 block font-semibold">Official Email:</span>
                  <a href="mailto:info@jaipurpropertywala.in" className="text-sm font-bold text-forest-900 hover:text-gold-700">
                    info@jaipurpropertywala.in
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://api.whatsapp.com/send?phone=919828226566&text=Hello%20Jaipur%20Property%20Wala,%20I%20would%20like%20to%20enquire%20about%20JDA%20plots."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold shadow flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Consultation</span>
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-forest-950 text-white p-7 rounded-2xl border-2 border-gold-600 shadow-xl space-y-2">
              <div className="flex items-center space-x-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Office & Site Visit Timings</span>
              </div>
              <p className="text-base font-bold font-editorial text-white">
                Monday to Sunday: 9:00 AM – 8:00 PM
              </p>
              <p className="text-xs text-gray-200 leading-relaxed font-normal">
                Site visits are organized throughout the week including Sundays with dedicated pick-and-drop AC cab service.
              </p>
            </div>

          </div>

          {/* Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-300 shadow-luxury space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-800 block mb-1">
                  Send Your Inquiry
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-forest-950">
                  Request Callback & Project Layouts
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-700 font-normal">
                  Fill out the form below. A certified land advisor will contact you with complete plot maps, registry copies, and pricing.
                </p>
              </div>

              {success ? (
                <div className="p-8 bg-forest-50 border-2 border-forest-200 rounded-2xl text-center space-y-4">
                  <div className="w-16 h-16 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-forest-800" />
                  </div>
                  <h4 className="text-2xl font-bold text-forest-950 font-editorial">
                    Thank You for Your Enquiry!
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                    Your request has been logged directly into our sales desk. We will call you within 15 minutes to share plot availability.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs font-bold text-forest-900 underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="9828226566"
                        className="form-input-luxury"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Preferred Location in Jaipur
                      </label>
                      <input
                        type="text"
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        placeholder="e.g. Jagatpura, Mahindra SEZ"
                        className="form-input-luxury"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Interested Property / Scheme
                      </label>
                      <input
                        type="text"
                        value={formData.interestedProperty}
                        onChange={(e) => setFormData({ ...formData, interestedProperty: e.target.value })}
                        placeholder="e.g. VRB World City, Bombay Hospital Plots"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Approx Budget
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. ₹25L - ₹45L"
                        className="form-input-luxury"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-950 mb-1.5">
                      Message / Requirement Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write any specific requirements (plot size in Gaj, corner facing, bank loan need)..."
                      className="form-input-luxury"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-forest-950 hover:bg-forest-900 text-gold-300 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 border border-gold-500/50"
                  >
                    {loading ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold-400" />
                        <span>Send Free Property Enquiry</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-[11px] text-center text-charcoal-600 font-medium">
                    🔒 Zero Spam Guarantee. Your personal details are never shared with outside marketing agencies.
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Map Embed */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-300 aspect-[21/9]">
          <iframe
            title="Jaipur Property Wala Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.51733246473!2d75.76839352932943!3d26.818814524458826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9e208b0beab%3A0xe542fe882433e387!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
};
