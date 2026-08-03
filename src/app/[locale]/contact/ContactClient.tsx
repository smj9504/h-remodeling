'use client';

import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, Instagram, Facebook, Send, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';

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
    successDetail: string;
    successCta: string;
    error: string;
    reassurance: string;
    phoneHint: string;
    messagePlaceholder: string;
    nameRequired: string;
    nameMaxLength: string;
    phoneRequired: string;
    phoneInvalid: string;
    emailInvalid: string;
    serviceRequired: string;
    messageRequired: string;
    messageMaxLength: string;
    networkError: string;
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
  faq: {
    title: string;
  };
  sidebar: {
    contactInfo: string;
    serviceAreas: string;
    maryland: string;
    virginia: string;
    dc: string;
    marylandAreas: string;
    virginiaAreas: string;
    dcAreas: string;
  };
  services: { value: string; label: string }[];
  faqs: Array<{ question: string; answer: string }>;
}

interface ContactClientProps {
  locale: string;
  translations: Translations;
}

const VALID_SERVICES = ['kitchen', 'bathroom', 'flooring', 'decking'];
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-red-600 flex items-start gap-1" role="alert">
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

export default function ContactClient({ locale, translations: t }: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    // Honeypot check
    if (honeypotRef.current?.value) return;

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email?.trim() || undefined,
          phone: data.phone.trim(),
          service: data.service,
          message: data.message.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || t.form.error);
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError(t.form.networkError);
      } else {
        setError(err instanceof Error ? err.message : t.form.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, reset, t.form.error, t.form.networkError]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {t.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {t.title}
            </h1>
            <p className="text-lg text-neutral-600">
              {t.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section — before form so users get answers before committing */}
      <section className="py-12 sm:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
              {t.faq.title}
            </h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="space-y-4">
            {t.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `faq-panel-${index}`;
              const triggerId = `faq-trigger-${index}`;

              return (
                <StaggerItem key={index}>
                  <div className="bg-white border border-neutral-200 overflow-hidden">
                    <h3>
                      <button
                        id={triggerId}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-neutral-900 pr-8">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2, delay: 0.05 } }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 pt-2">
                            <p className="text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile quick-call bar — visible only below lg */}
          <div className="lg:hidden mb-8">
            <a
              href="tel:+17035859517"
              className="flex items-center justify-center gap-3 w-full py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              (703) 585-9517
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <FadeIn direction="right" className="lg:col-span-2">
              <div className="bg-white p-8 border border-neutral-200">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    role="status"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-5" aria-hidden="true" />
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3">
                      {t.form.success}
                    </h3>
                    <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                      {t.form.successDetail}
                    </p>
                    <a
                      href="tel:+17035859517"
                      className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {t.form.successCta}: (703) 585-9517
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Honeypot — invisible to users, traps bots */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        ref={honeypotRef}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.name} <span aria-hidden="true">*</span>
                          <span className="sr-only"> (required)</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          maxLength={100}
                          {...register('name', {
                            required: t.form.nameRequired,
                            maxLength: { value: 100, message: t.form.nameMaxLength },
                          })}
                          className={`w-full px-4 py-3 border ${
                            errors.name ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                        />
                        <FieldError message={errors.name?.message} />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          {...register('email', {
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t.form.emailInvalid,
                            },
                          })}
                          className={`w-full px-4 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.phone} <span aria-hidden="true">*</span>
                          <span className="sr-only"> (required)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          autoComplete="tel"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          {...register('phone', {
                            required: t.form.phoneRequired,
                            pattern: {
                              value: PHONE_PATTERN,
                              message: t.form.phoneInvalid,
                            },
                          })}
                          className={`w-full px-4 py-3 border ${
                            errors.phone ? 'border-red-500' : 'border-neutral-300'
                          } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors`}
                          placeholder="(703) 555-0123"
                        />
                        <FieldError message={errors.phone?.message} />
                        {!errors.phone && (
                          <p className="mt-1.5 text-xs text-neutral-500">{t.form.phoneHint}</p>
                        )}
                      </div>

                      {/* Service */}
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.form.service} <span aria-hidden="true">*</span>
                          <span className="sr-only"> (required)</span>
                        </label>
                        <select
                          id="service"
                          aria-required="true"
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? 'service-error' : undefined}
                          {...register('service', {
                            required: t.form.serviceRequired,
                            validate: (v) => VALID_SERVICES.includes(v) || t.form.serviceRequired,
                          })}
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
                        <FieldError message={errors.service?.message} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.form.message} <span aria-hidden="true">*</span>
                        <span className="sr-only"> (required)</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        maxLength={2000}
                        {...register('message', {
                          required: t.form.messageRequired,
                          maxLength: { value: 2000, message: t.form.messageMaxLength },
                        })}
                        placeholder={t.form.messagePlaceholder}
                        className={`w-full px-4 py-3 border ${
                          errors.message ? 'border-red-500' : 'border-neutral-300'
                        } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none`}
                      />
                      <FieldError message={errors.message?.message} />
                    </div>

                    {/* API Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 flex items-start gap-2" role="alert">
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Reassurance + Submit */}
                    <p className="text-sm text-neutral-500">{t.form.reassurance}</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t.form.sending}
                        </>
                      ) : (
                        <>
                          {t.form.submit}
                          <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Contact Info Sidebar */}
            <FadeIn direction="left" delay={0.3} className="lg:col-span-1">
              <div className="bg-neutral-900 text-white p-8">
                <h3 className="text-xl font-display font-bold mb-8">
                  {t.sidebar.contactInfo}
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.phone}</p>
                      <a href="tel:+17035859517" className="inline-block py-1 font-medium hover:text-primary-400 transition-colors">
                        (703) 585-9517
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.email}</p>
                      <a href="mailto:hremodeling05@gmail.com" className="inline-block py-1 font-medium hover:text-primary-400 transition-colors break-all">
                        hremodeling05@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{t.info.hours}</p>
                      <p className="font-medium">{t.info.hoursValue}</p>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
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
                      aria-label="Instagram"
                      className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61584490866793"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-neutral-50 p-8 mt-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {t.sidebar.serviceAreas}
                </h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <p><strong>{t.sidebar.maryland}:</strong> {t.sidebar.marylandAreas}</p>
                  <p><strong>{t.sidebar.virginia}:</strong> {t.sidebar.virginiaAreas}</p>
                  <p><strong>{t.sidebar.dc}:</strong> {t.sidebar.dcAreas}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
