import { Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react'
import { useTranslation } from "react-i18next";
import { APP_CONTACTS } from '../../lib/config/app.config'

const Footer = () => {
  const { t } = useTranslation('common')

  const authorName = t('footer.name')
  const logoInitial = authorName?.trim()?.charAt(0).toUpperCase() ?? "A"

  return (
    <footer className="relative overflow-hidden 
      bg-gradient-to-b from-gray-50 to-white 
      dark:from-gray-900 dark:to-black 
      border-t border-gray-200/60 dark:border-gray-800/60">

      {/* Subtle glass gradient */}
      <div className="absolute inset-0 
        bg-gradient-to-r from-cyan-500/5 to-purple-500/5 
        dark:from-cyan-500/8 dark:to-purple-500/8" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        py-6 lg:py-8">   {/* ⬅️ BALANDLIK KICHIKLASHTIRILDI */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 mb-8">

          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <div className="flex flex-col space-y-3">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl 
                  bg-gradient-to-br from-cyan-500 to-purple-500 
                  flex items-center justify-center 
                  shadow-md shadow-cyan-500/15">
                  <span className="text-white font-bold text-xl">
                    {logoInitial}
                  </span>
                </div>

                <h3 className="text-xl font-bold 
                  bg-clip-text text-transparent 
                  bg-gradient-to-r from-gray-900 via-cyan-700 to-purple-600 
                  dark:from-white dark:via-cyan-300 dark:to-purple-400">
                  {authorName}
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">
              {t('footer.quickLinks')}
            </h4>

            <ul className="space-y-2">
              {['home', 'about', 'services', 'portfolio', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="inline-flex items-center gap-2 
                      text-gray-600 dark:text-gray-300 
                      hover:text-cyan-600 dark:hover:text-cyan-400 
                      transition-colors duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 
                      group-hover:opacity-100 group-hover:translate-x-0 
                      transition-all duration-300" />
                    <span>{t(`nav.${item}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">
              {t('footer.contactUs')}
            </h4>

            <div className="space-y-2">

              {/* EMAIL */}
              <a 
                href={`mailto:${APP_CONTACTS.email}`}
                className="group flex items-start gap-3 p-2.5 
                  rounded-xl bg-white/60 dark:bg-gray-800/60 
                  border border-gray-200/40 dark:border-gray-700/40 
                  hover:border-cyan-500/40 hover:shadow-md 
                  transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 
                  group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('footer.email')}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium 
                    group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {APP_CONTACTS.email}
                  </p>
                </div>
              </a>

              {/* PHONE */}
              <a 
                href={`tel:${APP_CONTACTS.phone}`}
                className="group flex items-start gap-3 p-2.5 
                  rounded-xl bg-white/60 dark:bg-gray-800/60 
                  border border-gray-200/40 dark:border-gray-700/40 
                  hover:border-purple-500/40 hover:shadow-md 
                  transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 
                  group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                  <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('footer.phone')}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium 
                    group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {APP_CONTACTS.phone}
                  </p>
                </div>
              </a>

              {/* ADDRESS */}
              <div className="group flex items-start gap-3 p-2.5 
                rounded-xl bg-white/60 dark:bg-gray-800/60 
                border border-gray-200/40 dark:border-gray-700/40 
                hover:border-emerald-500/40 hover:shadow-md 
                transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 
                  group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('footer.address')}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium 
                    group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {APP_CONTACTS.address}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center 
          gap-3 pt-4 border-t border-gray-200/40 dark:border-gray-800/40">

          <p className="text-gray-600 dark:text-gray-300 text-sm 
            flex items-center gap-1">
            © {new Date().getFullYear()} {t('footer.copyright')}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          </p>

          <div className="flex items-center gap-5 text-sm">
            <a 
              href="/privacy" 
              className="text-gray-600 dark:text-gray-300 
                hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="/terms" 
              className="text-gray-600 dark:text-gray-300 
                hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
