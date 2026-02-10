import { Languages } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/ui/dropdown-menu'
import { useLanguage } from '../hooks/useLanguage'

export function LanguageSwitcher() {
  const {
    t,
    languages,
    currentLanguage,
    changeLanguage,
  } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            p-3 
            rounded-xl 
            bg-gradient-to-r from-gray-100 to-white 
            dark:from-gray-800 dark:to-gray-900 
            text-gray-700 dark:text-gray-300 
            hover:from-gray-200 hover:to-gray-100 
            dark:hover:from-gray-700 dark:hover:to-gray-800 
            transition-all duration-300 
            shadow-md hover:shadow-lg
          "
        >
          <Languages className="h-6 w-6 transition-transform group-hover:scale-105" />
          <span className="sr-only">
            {t('language.selectLanguage')}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          mt-2 
          w-40 
          rounded-2xl 
          bg-white/95 dark:bg-gray-900/95 
          backdrop-blur-xl 
          shadow-2xl 
          border border-gray-200/30 dark:border-gray-700/30
          animate-in fade-in slide-in-from-top-2 duration-300
        "
      >
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              px-4 py-3
              text-sm
              rounded-xl
              transition-all duration-200
              ${
                lang.code === currentLanguage?.code
                  ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400'
                  : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              }
            `}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
