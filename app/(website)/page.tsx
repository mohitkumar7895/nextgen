import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CompanyIntroSection } from '@/components/home/CompanyIntroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { StatsSection } from '@/components/home/StatsSection';
import { BlogSection } from '@/components/home/BlogSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import { QuickContactSection } from '@/components/home/QuickContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. 3D Animated Hero Section */}
      <HeroSection />

      {/* 2. Company Introduction */}
      <CompanyIntroSection />

      {/* 3. Core Services Cards */}
      <ServicesSection />

      {/* 4. Why Choose NexGen */}
      <WhyChooseSection />

      {/* 5. Industries We Serve */}
      <IndustriesSection />

      {/* 6. Our 6-Step Workforce Process */}
      <ProcessSection />

      {/* 7. Dynamic Company Statistics */}
      <StatsSection />

      {/* 8. Latest Blog & Workforce Insights */}
      <BlogSection />

      {/* 9. Call To Action Banner */}
      <CtaBanner />

      {/* 10. Contact & Google Maps Section */}
      <QuickContactSection />
    </>
  );
}
