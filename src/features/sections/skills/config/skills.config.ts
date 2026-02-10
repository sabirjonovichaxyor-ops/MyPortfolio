import {
  Code,
  Wrench,
  Palette,
  Database,
} from 'lucide-react'

export const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "blue",
    skills: [
      { name: "React", level: 60 },
      { name: "TypeScript", level: 65 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 78 },
      { name: "Tailwind CSS", level: 70 },
      { name: "Next.js", level: 60 },
    ],
  },
  {
    title: "Elektromexanika",
    icon: Wrench,
    color: "orange",
    skills: [
      { name: "PLC Programming", level: 75 },
      { name: "Avtomatika", level: 80 },
      { name: "Elektr sxemalari", level: 85 },
      { name: "Nazorat tizimlari", level: 60 },
      { name: "Sensorlar", level: 60 },
      { name: "Motor boshqaruv", level: 70 },
    ],
  },
  {
    title: "Dizayn",
    icon: Palette,
    color: "purple",
    skills: [
      { name: "UI/UX Design", level: 50 },
      { name: "Figma", level: 65 },
      { name: "Adobe Creative Suite", level: 60 },
      { name: "Prototyping", level: 67 },
      { name: "User Research", level: 52 },
      { name: "Branding", level: 68 },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    color: "green",
    skills: [
      { name: "Node.js", level: 65 },
      { name: "Python", level: 70 },
      { name: "SQL", level: 80 },
      { name: "MongoDB", level: 72 },
      { name: "REST APIs", level: 65 },
      { name: "GraphQL", level: 65 },
    ],
  },
]

export const tools = [
  { name: "VS Code", icon: "💻" },
  { name: "Git", icon: "🔧" },
  { name: "Docker", icon: "🐳" },
  { name: "Figma", icon: "🎨" },
  { name: "AutoCAD", icon: "📐" },
  { name: "MATLAB", icon: "📊" },
]

export const certifications = [
  {
    icon: "🏆",
    title: "Professional Elektromexanik",
    desc: "Davlat sertifikati",
    color: "yellow",
  },
  {
    icon: "💻",
    title: "Frontend Developer",
    desc: "React & TypeScript",
    color: "blue",
  },
  {
    icon: "🎨",
    title: "UI/UX Designer",
    desc: "User Experience",
    color: "purple",
  },
]
