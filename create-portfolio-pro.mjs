import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const ROOT = process.cwd()

const structure = {
  public: ["favicon.svg"],

  src: {
    "main.tsx": "",
    app: {
      "App.tsx": "",
      "providers.tsx": "",
      "router.tsx": "",
      pages: ["PublicPage.tsx", "AdminPage.tsx"],
    },

    layouts: ["PublicLayout.tsx", "AdminLayout.tsx"],

    features: {
      navigation: ["Navigation.tsx", "NavigationView.tsx", "useNavigation.ts"],

      sections: [
        "Home.tsx",
        "About.tsx",
        "Experience.tsx",
        "Skills.tsx",
        "Blog.tsx",
        "Analytics.tsx",
        "Contact.tsx",
        "sections.config.ts",
        "sections.map.ts",
        "index.ts",
      ],

      language: {
        config: ["languages.config.ts"],
        hooks: ["useLanguage.ts"],
        ui: ["LanguageSwitcher.tsx"],
        "index.ts": "",
      },

      theme: ["ThemeProvider.tsx", "useTheme.ts", "index.ts"],

      admin: {
        ui: ["AdminDashboard.tsx", "AdminLogin.tsx"],
        guards: ["AuthGuard.tsx"],
      },
    },

    shared: {
      ui: [
        "Button.tsx",
        "Card.tsx",
        "Input.tsx",
        "Modal.tsx",
        "dropdown-menu.tsx",
        "LoadingSpinner.tsx",
      ],
      hooks: [
        "useLocalStorage.ts",
        "useScrollProgress.ts",
        "useClickOutside.ts",
      ],
      utils: ["cn.ts", "classNames.ts", "constants.ts"],
      types: ["i18n.ts", "navigation.ts", "section.ts"],
    },

    lib: {
      i18n: ["index.ts", "resources.ts"],
      "supabase.ts": "",
      "analytics.ts": "",
    },

    styles: ["globals.css", "tokens.css", "themes.css"],
  },

  docs: ["architecture.md"],

  "package.json": `{
    "name": "portfolio-pro",
    "private": true,
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.21.0",
      "i18next": "^23.6.0",
      "react-i18next": "^13.5.0",
      "@supabase/supabase-js": "^2.39.0",
      "clsx": "^2.0.0"
    },
    "devDependencies": {
      "vite": "^5.0.0",
      "typescript": "^5.3.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0"
    }
  }`,
}

function createStructure(base, tree) {
  if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true })

  if (Array.isArray(tree)) {
    tree.forEach((file) => {
      const filePath = path.join(base, file)
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "")
    })
    return
  }

  Object.entries(tree).forEach(([name, value]) => {
    const target = path.join(base, name)

    if (typeof value === "string") {
      fs.writeFileSync(target, value)
      return
    }

    fs.mkdirSync(target, { recursive: true })
    createStructure(target, value)
  })
}

console.log("🚀 Creating Portfolio PRO structure...")
createStructure(ROOT, structure)

console.log("📦 Installing dependencies...")
execSync("npm install", { cwd: ROOT, stdio: "inherit" })

console.log("✅ Portfolio PRO is ready!")
console.log("👉 Run: npm run dev")
