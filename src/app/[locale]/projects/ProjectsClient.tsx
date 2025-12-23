'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

interface ProjectsClientProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    description: string;
    viewProject: string;
    viewAll: string;
    categories: {
      all: string;
      kitchen: string;
      bathroom: string;
      flooring: string;
      decking: string;
    };
  };
}

const categoryKeys = ['all', 'kitchen', 'bathroom', 'flooring', 'decking'] as const;

export default function ProjectsClient({ locale, translations }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = (activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)
  ).sort((a, b) => {
    // Sort by year descending (most recent first)
    if (a.year !== b.year) {
      return b.year.localeCompare(a.year);
    }
    // If year is same, sort by city alphabetically
    const cityA = a.location.split(',')[0].trim();
    const cityB = b.location.split(',')[0].trim();
    return cityA.localeCompare(cityB);
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {translations.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {translations.title}
            </h1>
            <p className="text-lg text-neutral-600">
              {translations.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categoryKeys.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {translations.categories[category]}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block relative overflow-hidden img-hover-zoom"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image}
                      alt={project.slug}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-medium uppercase tracking-wider mb-2">
                      {translations.categories[project.category as keyof typeof translations.categories]}
                    </span>
                    <p className="text-white text-sm mb-2">{project.location}</p>
                    <p className="text-white font-medium flex items-center">
                      {translations.viewProject}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </p>
                  </div>

                  {/* Always visible label */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 text-neutral-900 text-xs font-medium uppercase tracking-wider">
                      {translations.categories[project.category as keyof typeof translations.categories]}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-neutral-400 mb-8">
            Contact us for a free consultation and estimate.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
