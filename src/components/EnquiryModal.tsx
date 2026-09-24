import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Phone, User, Mail, Home, MapPin, Send } from 'lucide-react';
import { enquiryService } from '../services/api';
import { Property } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProperty
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: selectedProperty?.location.area || 'Jaipur',
    budget: selectedProperty?.priceDisplay || 'Any',
    message: selectedProperty ? `I am interested in ${selectedProperty.title}. Please provide more details and arrange a site visit.` : ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await enquiryService.create({
        ...formData,
        interestedProperty: selectedProperty?.title || 'General Enquiry',
        source: selectedProperty ? `Property Detail: ${selectedProperty.slug}` : 'Website Modal'
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please call us directly at 9828226566.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gold-600/60 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-forest-950 px-6 py-5 text-white flex justify-between items-center border-b border-forest-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-editorial text-gold-400">
              {selectedProperty ? 'Property Enquiry & Site Visit' : 'Schedule Site Visit & Advisory'}
            </h3>
            <p className="text-xs text-gray-300">
              {selectedProperty ? selectedProperty.title : 'Jaipur Property Wala • 100% Free Consultation'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-forest-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {success ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center mx-auto border-2 border-forest-200">
                <CheckCircle className="w-8 h-8 text-forest-800" />
              </div>
              <h4 className="text-2xl font-bold text-forest-950 font-editorial">
                Enquiry Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Our Senior Jaipur Land Advisor will contact you within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-forest-950 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-950 mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9828226566"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-950 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-950 mb-1">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      placeholder="e.g. Jagatpura, SEZ"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-950 mb-1">
                    Approx Budget
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g. ₹25L - ₹40L"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-950 mb-1">
                  Message / Specific Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Plot size in Gaj, corner facing, bank loan need..."
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest-950 hover:bg-forest-900 text-gold-300 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 border border-gold-500/50"
              >
                {loading ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-400" />
                    <span>Request Free Callback & Site Visit</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-charcoal-600 pt-1 font-medium">
                🔒 100% Confidential. Direct call from certified Jaipur land advisor.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
