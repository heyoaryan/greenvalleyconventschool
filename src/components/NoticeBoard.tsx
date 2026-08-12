import { Megaphone, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Notice } from '../lib/supabase';
import { getNotices } from '../lib/supabase';

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data || []);
      } catch (err) {
        console.error('Failed to load notices:', err);
      } finally {
        setLoading(false);
      }
    };
    loadNotices();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!loading && notices.length === 0) return null;

  return (
    /* Bottom-left, but above the ScrollToTop button which is bottom-right.
       On mobile keep it small enough so it never reaches bottom-right corner.
       max-w is capped to avoid the widget being wider than the viewport. */
    <div className="fixed bottom-5 left-3 sm:bottom-6 sm:left-6 z-50 w-72 sm:w-80 max-w-[calc(100vw-5rem)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-school-green to-school-green/90 p-3.5 sm:p-4 cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-school-gold" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">Notice Board</h3>
                <p className="text-green-100 text-xs">
                  {loading ? 'Loading…' : `${notices.length} notice${notices.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-white flex-shrink-0" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Notices list */}
        {isExpanded && (
          <div className="max-h-64 sm:max-h-80 overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="p-6 text-center">
                <div className="w-6 h-6 border-2 border-school-green border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              notices.map((notice) => (
                <div key={notice.id} className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-school-green rounded-full flex-shrink-0" />
                    <span className="text-xs text-gray-400">{formatDate(notice.date)}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {notice.description}
                  </p>
                  {notice.link && (
                    <a
                      href={notice.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-school-green hover:underline mt-1.5"
                    >
                      {notice.link_text || 'View link'}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
