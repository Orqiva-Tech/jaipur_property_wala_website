import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Upload,
  CheckCircle2,
  AlertCircle,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  X,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { careerService } from '../services/api';
import { Career } from '../types';

export const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: 'Jaipur',
    experienceYears: '1 - 3 Years',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const res = await careerService.getActive();
        setCareers(res.data.data || []);
      } catch (err) {
        console.error('Error fetching careers', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const openApplication = (job?: Career) => {
    setSelectedJob(job || null);
    setIsApplyModalOpen(true);
    setSuccess(false);
    setError('');
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume in PDF, DOC, or DOCX format.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('currentLocation', formData.currentLocation);
      data.append('experienceYears', formData.experienceYears);
      data.append('coverLetter', formData.coverLetter);
      data.append('jobTitle', selectedJob ? selectedJob.title : 'General Application');
      if (selectedJob) data.append('careerId', selectedJob._id);
      data.append('resume', resumeFile);

      await careerService.apply(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: Career Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-950 text-white p-8 sm:p-14 lg:p-16 border-2 border-gold-600 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-900/80" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-gold-950/80 border border-gold-500/60 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
                Work With Jaipur’s Real Estate Leaders
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-white leading-tight">
              Build an Extraordinary Career at{' '}
              <span className="text-gold-400">Jaipur Property Wala</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              Join Rajasthan's fastest-growing colonizer & township developer. We empower our team with verified JDA & RERA inventories, direct developer backing, hands-on legal mentorship, and uncapped performance incentives.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => openApplication()}
                className="px-8 py-3.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-sm tracking-wide shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                <span>Submit General Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#openings"
                className="px-6 py-3.5 rounded-xl bg-forest-900/90 hover:bg-forest-800 text-white font-semibold text-sm border border-gold-500/40 transition-all"
              >
                View {careers.length} Open Positions
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 2: Why Work With Us */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full inline-block">
              Culture & Advantages
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-900">
              Why Join Our Growth Journey?
            </h2>
            <p className="text-sm text-charcoal-700">
              We provide the ideal ecosystem for sales champions, legal researchers, and real estate professionals to thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-luxury space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-forest-900">Highest Commission Incentives</h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Enjoy transparent and timely commissions on high-ticket township closings in addition to competitive fixed salaries with fast-track promotion milestones.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-luxury space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
                <Award className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-forest-900">20+ Years Brand Credibility</h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Represent genuine JDA-approved schemes that customers trust. Spot registry, clear 90-A pattas, and SBI pre-approvals make deal closures smooth and fulfilling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-luxury space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-forest-900">Mentorship & Executive Training</h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Learn directly from veterans of land acquisition, revenue documentation, government master plans, and luxury corporate sales strategies.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Current Job Openings */}
        <div id="openings" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-300 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-800 block mb-1">
                Active Vacancies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-forest-900">
                Explore Current Career Opportunities
              </h2>
            </div>
            <span className="text-xs font-bold text-forest-900 bg-forest-50 border border-forest-200 px-3 py-1 rounded-full mt-2 sm:mt-0">
              {careers.length} Verified Positions in Jaipur
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-white rounded-2xl animate-pulse border border-stone-200" />
              ))}
            </div>
          ) : careers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto shadow-luxury">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-forest-900">No Current Openings</h3>
              <p className="text-xs sm:text-sm text-charcoal-700">
                We are always seeking exceptional sales consultants, telecallers, and legal draftsmen. Submit your resume for upcoming schemes.
              </p>
              <button
                onClick={() => openApplication()}
                className="px-6 py-2.5 bg-forest-900 hover:bg-forest-800 text-gold-400 font-bold rounded-lg text-xs"
              >
                Submit General Profile
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {careers.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-luxury hover:border-gold-500/60 transition-all duration-200 space-y-5"
                >
                  {/* Job Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-forest-50 text-forest-900 border border-forest-200 font-bold text-xs px-3 py-1 rounded-md">
                          {job.department}
                        </span>
                        <span className="bg-stone-100 text-stone-800 font-semibold text-xs px-3 py-1 rounded-md">
                          {job.employmentType}
                        </span>
                        {job.isActive && (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                            Actively Hiring
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-editorial text-forest-900">
                        {job.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => openApplication(job)}
                      className="self-start md:self-auto px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-400 font-bold text-xs tracking-wide shadow-md transition-all border border-gold-500/40 hover:border-gold-400 flex items-center space-x-2 whitespace-nowrap"
                    >
                      <span>Apply for Position</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Highlights Bar */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-charcoal-700 bg-[#F4F6F4] p-3 rounded-xl border border-stone-200">
                    <div className="flex items-center space-x-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-gold-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-medium">
                      <Briefcase className="w-4 h-4 text-gold-600" />
                      <span>Experience: {job.experience}</span>
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center space-x-1.5 font-bold text-forest-900">
                        <IndianRupee className="w-4 h-4 text-gold-600" />
                        <span>{job.salaryRange}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-normal">
                    {job.description}
                  </p>

                  {/* Responsibilities */}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="pt-1 border-t border-stone-100">
                      <h5 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-2.5">
                        Key Responsibilities:
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-700">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-gold-600 font-bold mt-0.5">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Qualifications */}
                  {job.qualifications && job.qualifications.length > 0 && (
                    <div className="pt-1 border-t border-stone-100">
                      <h5 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-2.5">
                        Candidate Qualifications:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {job.qualifications.map((qual: string, i: number) => (
                          <span
                            key={i}
                            className="bg-stone-50 border border-stone-200 text-charcoal-800 text-[11px] px-2.5 py-1 rounded"
                          >
                            ✓ {qual}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gold-500/50 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-forest-950 px-6 py-5 text-white flex justify-between items-center border-b border-forest-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-editorial text-gold-400">
                  {selectedJob ? `Apply: ${selectedJob.title}` : 'Submit General Job Application'}
                </h3>
                <p className="text-xs text-gray-300">
                  Jaipur Property Wala HR Desk • Jagatpura Head Office
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-forest-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-forest-50 text-forest-900 border-2 border-forest-200 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-forest-800" />
                  </div>
                  <h4 className="text-2xl font-bold text-forest-900 font-editorial">
                    Application Submitted Successfully!
                  </h4>
                  <p className="text-sm text-charcoal-700 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying to Jaipur Property Wala. Our talent acquisition team will review your resume and contact you shortly for interview scheduling.
                  </p>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="mt-4 px-8 py-3 bg-forest-900 hover:bg-forest-800 text-gold-400 text-xs font-bold rounded-xl shadow"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-forest-950 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="form-input-luxury"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@email.com"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09828226566"
                        className="form-input-luxury"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Current City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.currentLocation}
                        onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                        placeholder="Jaipur"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-950 mb-1.5">
                        Relevant Experience
                      </label>
                      <select
                        value={formData.experienceYears}
                        onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                        className="form-input-luxury"
                      >
                        <option value="Fresher">Fresher (Eager to Learn)</option>
                        <option value="1 - 3 Years">1 - 3 Years Real Estate</option>
                        <option value="3 - 5 Years">3 - 5 Years Plotted/Township</option>
                        <option value="5+ Years">5+ Years Senior Advisory</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-forest-950 mb-1.5">
                      Upload Resume (PDF, DOC, DOCX up to 5MB) *
                    </label>
                    <div className="border-2 border-dashed border-stone-300 bg-[#F8FAF8] rounded-xl p-5 text-center hover:border-forest-800 transition-colors">
                      <input
                        type="file"
                        id="resumeUpload"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="resumeUpload" className="cursor-pointer space-y-1 block">
                        <Upload className="w-8 h-8 text-forest-900 mx-auto" />
                        <span className="text-xs font-bold text-forest-950 block">
                          {resumeFile ? resumeFile.name : 'Click to browse and upload resume file'}
                        </span>
                        <span className="text-[11px] text-charcoal-600 block">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-950 mb-1.5">
                      Brief Introduction / Cover Note
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Share your experience with Jaipur real estate, township sales, or customer handling..."
                      className="form-input-luxury"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-400 font-bold text-xs uppercase tracking-wider shadow-lg transition-all border border-gold-500/40"
                  >
                    {submitting ? 'Uploading Application...' : 'Submit Job Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
