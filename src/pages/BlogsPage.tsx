import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, Search, Tag } from 'lucide-react';
import { blogService } from '../services/api';
import { Blog } from '../types';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'JDA Plots & Investment Guide',
    'Area Insights & Comparison',
    'Legal & Registry Checks'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await blogService.getAll({
          category: category !== 'All' ? category : undefined,
          search: search || undefined
        });
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, search]);

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded inline-block">
            Real Estate Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-900">
            Jaipur Property Insights & Advisory
          </h1>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            Stay informed with verified analyses on JDA bylaws, Jaipur Ring Road expansions, plot pricing trends, and legal land acquisition guidance from our property experts.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-luxury border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  category === cat
                    ? 'bg-forest-800 text-gold-400 font-bold shadow'
                    : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-charcoal-900 focus:ring-1 focus:ring-forest-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-white rounded-2xl animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 space-y-3 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-charcoal-400 mx-auto" />
            <h3 className="text-lg font-bold font-editorial text-forest-900">No Articles Found</h3>
            <p className="text-xs text-charcoal-500">Try adjusting your category filter or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-luxury hover:shadow-luxury-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-charcoal-500">
                      <span className="font-semibold text-gold-700 uppercase tracking-wider">
                        {blog.category}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <Link to={`/blogs/${blog.slug}`}>
                      <h3 className="text-lg font-bold font-editorial text-forest-900 group-hover:text-gold-700 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-500 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </span>

                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="text-xs font-bold text-forest-800 hover:text-gold-700 flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
