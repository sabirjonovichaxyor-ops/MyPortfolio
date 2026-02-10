import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBlog } from '../model/useBlog';

const Blog = () => {
  const { t } = useTranslation('blog');

  const {
    posts,
    loading,
    selectedPost,
    selectPost,
    formatDate,
    readingTime
  } = useBlog();

  /* ================= SINGLE POST ================= */
  if (selectedPost) {
    return (
      <section className="py-20 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => selectPost(null)}
            className="mb-8 flex items-center gap-2 text-blue-600"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            {t('back')}
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedPost.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {t('readingTime', {
                  count: readingTime(selectedPost.content),
                })}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-6">
              {selectedPost.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {selectedPost.content.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    );
  }

  /* ================= LIST ================= */
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold">
              {t('empty.title')}
            </h3>
            <p className="text-gray-500">
              {t('empty.description')}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article
              key={post.id}
              onClick={() => selectPost(post)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:-translate-y-1 transition"
            >
              <div className="p-6">
                <div className="flex gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readingTime(post.content)} min
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-gray-500 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex justify-between items-center text-blue-600 font-medium">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {t('read')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
