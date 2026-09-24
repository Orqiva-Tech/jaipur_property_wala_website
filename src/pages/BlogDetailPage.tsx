import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Eye, ShieldCheck, Phone } from 'lucide-react';
import { blogService, formatImageUrl } from '../services/api';
import { Blog } from '../types';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await blogService.getBySlug(slug);
        setBlog(res.data.data);
        setRelated(res.data.related || []);
      } catch (error) {
        console.error('Error fetching blog', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-12 bg-gray-200 rounded w-3/4" />
        <div className="h-96 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold font-editorial text-forest-900">Article Not Found</h2>
        <Link to="/blogs" className="inline-block px-6 py-2.5 bg-forest-800 text-gold-400 font-semibold rounded-lg text-sm">
          Return to Blog Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Meta */}
        <div className="flex items-center justify-between">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-forest-800 hover:text-gold-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: blog.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }
            }}
            className="flex items-center space-x-1.5 text-xs text-charcoal-600 hover:text-forest-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Title & Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded inline-block">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-editorial text-forest-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 pt-2 border-b border-gray-200 pb-4">
            <span className="flex items-center space-x-1 text-forest-900 font-medium">
              <User className="w-3.5 h-3.5 text-gold-600" />
              <span>{blog.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{blog.views || 1} Views</span>
            </span>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] border-2 border-white">
          <img src={formatImageUrl(blog.coverImage)} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Rich Content */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-luxury space-y-6 text-sm sm:text-base text-charcoal-800 leading-relaxed prose prose-forest max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold text-charcoal-500 self-center mr-1">Tags:</span>
            {blog.tags.map((tag, idx) => (
              <span key={idx} className="bg-white text-forest-900 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 shadow-2xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-gray-200 space-y-6">
            <h3 className="text-2xl font-bold font-editorial text-forest-900">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  to={`/blogs/${item.slug}`}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-luxury hover:border-gold-500/50 transition-all flex flex-col justify-between"
                >
                  <h4 className="text-base font-bold font-editorial text-forest-900 mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs text-gold-700 font-semibold">{item.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
};
