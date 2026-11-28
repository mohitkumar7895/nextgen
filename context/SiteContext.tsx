'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface SiteSettingsMap {
  company_name?: string;
  brand_tagline?: string;
  business_category?: string;
  client_contact_name?: string;
  contact_phone_primary?: string;
  contact_phone_secondary?: string;
  contact_whatsapp?: string;
  contact_email?: string;
  contact_gst_number?: string;
  contact_address?: string;
  contact_locality?: string;
  contact_district?: string;
  contact_state?: string;
  contact_pincode?: string;
  contact_map_embed?: string;
  hero_heading?: string;
  hero_subheading?: string;
  hero_cta_primary_text?: string;
  hero_cta_primary_link?: string;
  hero_cta_secondary_text?: string;
  hero_cta_secondary_link?: string;
  hero_slide_1_image?: string;
  hero_slide_2_image?: string;
  hero_slide_3_image?: string;
  company_intro_badge?: string;
  company_intro_heading?: string;
  company_intro_text?: string;
  company_intro_highlight?: string;
  company_intro_image?: string;
  office_location_image?: string;
  cta_heading?: string;
  cta_description?: string;
  cta_button_text?: string;
  cta_button_link?: string;
  [key: string]: string | undefined;
}

interface SiteContextType {
  settings: SiteSettingsMap;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  whatsappUrl: string;
}

const defaultSettings: SiteSettingsMap = {
  company_name: 'NEXGEN WORKFORCE SERVICES',
  brand_tagline: 'Build People, Build Success.',
  business_category: 'Manpower Supply & Workforce Services',
  client_contact_name: 'CHAVADA NAKUL',
  contact_phone_primary: '9727930894',
  contact_phone_secondary: '9727930895',
  contact_whatsapp: '9727930894',
  contact_email: 'nexgenworkforce@gmail.com',
  contact_gst_number: '24CEOPC1058Q1Z6',
  contact_address:
    'Ratna Sagar, 1st Floor, Shop No. A-105, Survey No. 335 A/B/K, Near Kerala Bridge, Bavla, Ahmedabad, Gujarat – 382220, India.',
  hero_heading: 'Building Stronger Workforces. Empowering Better Businesses.',
  hero_subheading:
    'Your Trusted Partner for Skilled Manpower, Professional Staffing and Reliable Workforce Solutions.',
  hero_slide_1_image: '/images/hero/automobile-assembly-line.jpg',
  hero_slide_2_image: '/images/hero/automobile-robotics.jpg',
  hero_slide_3_image: '/images/hero/automobile-plant-1.jpg',
  company_intro_heading: 'Your Trusted Workforce Partner',
  company_intro_text:
    'NexGen Workforce Services provides reliable, skilled and trained manpower solutions to businesses across multiple industries. We focus on delivering professional workforce support, dependable staffing services and quality manpower management.',
  company_intro_image: '/images/about/about-operations.jpg',
  office_location_image: '/images/office/office-location.jpg',
};

const SiteContext = createContext<SiteContextType>({
  settings: defaultSettings,
  loading: false,
  refreshSettings: async () => {},
  whatsappUrl: 'https://wa.me/919727930894',
});

export function SiteProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: SiteSettingsMap;
}) {
  const [settings, setSettings] = useState<SiteSettingsMap>(initialSettings || defaultSettings);
  const [loading, setLoading] = useState(false);

  const refreshSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/settings?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store' },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();

    const handleFocus = () => refreshSettings();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'site_settings_updated') {
        refreshSettings();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const rawWhatsapp = settings.contact_whatsapp || '9727930894';
  const cleanPhone = rawWhatsapp.replace(/[^0-9]/g, '');
  const finalWhatsapp = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${finalWhatsapp}?text=${encodeURIComponent(
    'Hello NexGen Workforce Services, I would like to inquire about manpower solutions for our business.'
  )}`;

  return (
    <SiteContext.Provider value={{ settings, loading, refreshSettings, whatsappUrl }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
