import { LucideIcon } from 'lucide-react';

export type HomeContent = {
  name: string;
  aboutMe: string;

  roles: string[];

  actions: {
    contact: string;
    download: string;
  };

  socials: Array<{
    icon: LucideIcon | React.ReactNode;
    url: string;
  }>;
};
