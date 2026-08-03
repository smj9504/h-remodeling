'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FadeIn, FilterGrid, FilterItem } from '@/components/animations';
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
    cta: {
      title: string;
      description: string;
      button: string;
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
      <section className="py-12 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="max-w-3xl">
            <p className="text-primary-600 font-medium tracking-wider uppercase mb-3">
              {translations.subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              {translations.title}
            </h1>
            <p className="text-lg text-neutral-600">
              {translations.description}
            </p>
          </FadeIn>
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
                className={`px-6 py-3 text-sm font-medium transition-colors ${
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
          <FilterGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <FilterItem key={project.id} layoutId={String(project.id)}>
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image}
                      alt={`${translations.categories[project.category as keyof typeof translations.categories]} remodeling project in ${project.location} completed by H Remodeling`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Persistent gradient — deepens on hover for emphasis */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent group-hover:from-neutral-900/80 transition-all duration-300" />
                  </div>

                  {/* Always visible overlay — no hover gate */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-medium uppercase tracking-wider mb-2">
                      {translations.categories[project.category as keyof typeof translations.categories]}
                    </span>
                    <p className="text-white/90 text-sm mb-1">{project.location}</p>
                    <p className="text-white font-medium flex items-center">
                      {translations.viewProject}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              </FilterItem>
            ))}
          </FilterGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            {translations.cta.title}
          </h2>
          <p className="text-lg text-neutral-400 mb-8">
            {translations.cta.description}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-300"
          >
            {translations.cta.button}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
