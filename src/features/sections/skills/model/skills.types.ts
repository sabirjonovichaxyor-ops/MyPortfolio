export type Skill = {
  name: string
  level: number
}

export type SkillCategory = {
  title: string
  skills: Skill[]
}

export type SkillsContent = {
  title: string
  subtitle: string

  categories: {
    frontend: SkillCategory
    electro: SkillCategory
    design: SkillCategory
    backend: SkillCategory
  }

  toolsTitle: string
  tools: {
    name: string
    icon: string
  }[]

  certsTitle: string
  certifications: {
    icon: string
    title: string
    desc: string
    color: string
  }[]
}
