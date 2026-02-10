export const socialsConfig = [
  { id: 'github', icon: 'github', url: 'https://github.com/username', color: 'blue' },
  { id: 'linkedin', icon: 'linkedin', url: 'https://linkedin.com/in/username', color: 'blue' },
  { id: 'telegram', icon: 'telegram', url: 'https://t.me/yourusername', color: 'blue' },
  { id: 'facebook', icon: 'facebook', url: 'https://facebook.com/username', color: 'blue' },
  { id: 'vk', icon: 'vk', url: 'https://vk.com/yourusername', color: 'blue' },
  { id: 'instagram', icon: 'instagram', url: 'https://instagram.com/yourusername', color: 'blue' },
  { id: 'odnoklassniki', icon: 'odnoklassniki', url: 'https://ok.ru/yourusername', color: 'blue' }
] as const;

export type SocialConfig = typeof socialsConfig[number];
