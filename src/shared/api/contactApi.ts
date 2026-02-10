import { ContactFormData } from '@/features/sections/contact/model/types';

export const submitContactMessage = async (
  payload: ContactFormData
): Promise<void> => {
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
