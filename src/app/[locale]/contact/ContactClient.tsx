'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, Clock, MapPin, Instagram, Facebook, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email?: string;
  phone: string;
  service: string;
  message: string;
}

interface Translations {
  title: string;
  subtitle: string;
  description: string;
  form: {
    name: string;
    email: string;
    phone: string;
    service: string;
    selectService: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  info: {
    phone: string;
    email: string;
    hours: string;
    hoursValue: string;
    area: string;
    areaValue: string;
  };
  social: {
    title: string;
  };
  services: { value: string; label: string }[];
}

interface ContactClientProps {
  locale: string;
  translations: Translations;
}

export default function ContactClient({ locale, translations: t }: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {t.title}
            </h1>
            <p className="text-lg text-neutral-600">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 border border-neutral-200">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                      {t.form.success}
                    </h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.name} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register('name', { required: true })}
                          className={`w-full px-4 py-3 border ${
                            errors.name ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register('email', { 
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                          })}
                          className={`w-full px-4 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.phone} *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          {...register('phone', { required: true })}
                          className={`w-full px-4 py-3 border ${
                            errors.phone ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                          placeholder="(703) 555-0123"
                        />
                      </div>

                      {/* Service */}
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.service} *
                        </label>
                        <select
                          id="service"
                          {...register('service', { required: true })}
                          className={`w-full px-4 py-3 border ${
                            errors.service ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors bg-white`}
                        >
                          <option value="">{t.form.selectService}</option>
                          {t.services.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.form.message} *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message', { required: true })}
                        className={`w-full px-4 py-3 border ${
                          errors.message ? 'border-red-500' : 'border-neutral-300'
                        } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none`}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t.form.sending}
                        </>
                      ) : (
                        <>
                          {t.form.submit}
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-900 text-white p-8">
                <h3 className="text-xl font-display font-bold mb-8">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.phone}</p>
                      <a href="tel:+17035859517" className="font-medium hover:text-primary-400 transition-colors">
                        (703) 585-9517
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.email}</p>
                      <a href="mailto:hremodeling05@gmail.com" className="font-medium hover:text-primary-400 transition-colors break-all">
                        hremodeling05@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.hours}</p>
                      <p className="font-medium">{t.info.hoursValue}</p>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.area}</p>
                      <p className="font-medium">{t.info.areaValue}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-10 pt-8 border-t border-neutral-700">
                  <p className="text-sm text-neutral-400 mb-4">{t.social.title}</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/hremodeling05/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61584490866793"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-neutral-50 p-8 mt-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Service Areas
                </h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <p><strong>Maryland:</strong> Bethesda, Rockville, Silver Spring, Potomac, Chevy Chase</p>
                  <p><strong>Virginia:</strong> Arlington, McLean, Tysons, Fairfax, Falls Church</p>
                  <p><strong>D.C.:</strong> Georgetown, Capitol Hill, Dupont Circle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
