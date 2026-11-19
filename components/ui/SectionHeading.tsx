import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  theme = 'light',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const isRight = align === 'right';
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl mb-6 sm:mb-8',
        isCenter && 'mx-auto text-center',
        isRight && 'ml-auto text-right',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase mb-2.5 transition-all duration-300',
            isDark
              ? 'bg-brand-bright/20 text-brand-bright border border-brand-bright/30'
              : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          {badge}
        </div>
      )}

      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display leading-[1.2]',
          isDark ? 'text-white' : 'text-brand-navy'
        )}
      >
        {title}{' '}
        {highlight && (
          <span className="gradient-text-orange inline-block">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-2 text-xs sm:text-sm leading-relaxed font-normal',
            isDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}

      {/* Decorative Brand Accent Line */}
      <div
        className={cn(
          'mt-3 flex items-center gap-1.5',
          isCenter && 'justify-center',
          isRight && 'justify-end'
        )}
      >
        <span className="h-1 w-10 rounded-full bg-brand-blue" />
        <span className="h-1 w-3 rounded-full bg-brand-orange" />
        <span className="h-1 w-1.5 rounded-full bg-brand-yellow" />
      </div>
    </div>
  );
}
