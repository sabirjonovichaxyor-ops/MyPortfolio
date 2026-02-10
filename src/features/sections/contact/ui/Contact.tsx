import React, { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Facebook
} from 'lucide-react';
import { FaVk, FaInstagram, FaOdnoklassniki } from 'react-icons/fa';

import { submitContactMessage } from '../../../../shared/api/contactApi';
import { trackPageView } from '../../../../shared/api/analyticsApi';

import { socialsConfig } from '../config/socials.config';
import { ContactFormData } from '../model/types';
import { useContactContent } from '../model/useContactContent';

const socialIconsMap = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
  facebook: Facebook,
  vk: FaVk,
  instagram: FaInstagram,
  odnoklassniki: FaOdnoklassniki
};

const Contact: React.FC = () => {
  const { title, subtitle, info, socialsTitle, availability, form } =
    useContactContent();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackPageView('contact');
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Contact info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                {info.title}
              </h3>

              <div className="space-y-6">
                <InfoRow
                  icon={Mail}
                  label={info.email.label}
                  value={info.email.value}
                  color="blue"
                />
                <InfoRow
                  icon={Phone}
                  label={info.phone.label}
                  value={info.phone.value}
                  color="green"
                />
                <InfoRow
                  icon={MapPin}
                  label={info.location.label}
                  value={info.location.value}
                  color="purple"
                />
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                {socialsTitle}
              </h3>

              <div className="flex flex-wrap gap-4">
                {socialsConfig.map(social => {
                  const Icon = socialIconsMap[social.icon];
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:shadow-lg transition-all"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {availability.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {availability.description}
              </p>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              {form.title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label={form.fields.name.label}
                  placeholder={form.fields.name.placeholder}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label={form.fields.email.label}
                  placeholder={form.fields.email.placeholder}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <Input
                label={form.fields.subject.label}
                placeholder={form.fields.subject.placeholder}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <Textarea
                label={form.fields.message.label}
                placeholder={form.fields.message.placeholder}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <Send className="w-5 h-5" />
                {isSubmitting
                  ? form.submit.loading
                  : form.submit.idle}
              </button>

              {submitStatus !== 'idle' && (
                <p
                  className={`text-center font-medium ${
                    submitStatus === 'success'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {form.status[submitStatus]}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

/* =======================
   Small UI helpers
======================= */

const InfoRow = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100 dark:bg-${color}-900/30`}
    >
      <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
    </div>
    <div>
      <p className="font-medium text-gray-800 dark:text-gray-200">{label}</p>
      <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      {...props}
      rows={6}
      required
      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
    />
  </div>
);
export { Contact };
