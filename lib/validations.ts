import { z } from 'zod';

export const InquirySchema = z.object({
  full_name: z.string().min(2, 'Full Name is required (minimum 2 characters)').max(150),
  company_name: z.string().min(2, 'Company Name is required').max(200),
  mobile_number: z
    .string()
    .min(10, 'Valid 10-digit mobile number required')
    .max(15)
    .regex(/^[0-9+\s\-()]+$/, 'Invalid phone number format'),
  email_address: z.string().email('Please enter a valid email address'),
  manpower_category: z.string().min(2, 'Please select or specify a manpower category'),
  employees_required: z.coerce.number().min(1, 'At least 1 employee is required').max(5000),
  location: z.string().min(2, 'Work location is required').max(255),
  message: z.string().optional().or(z.literal('')),
});

export const ContactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required').max(150),
  email: z.string().email('Valid email address is required'),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().optional().or(z.literal('')),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
});

export const AdminLoginSchema = z.object({
  email: z.string().email('Valid email address required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ServiceFormSchema = z.object({
  title: z.string().min(3, 'Service title is required').max(200),
  slug: z.string().min(3, 'Slug is required').max(120),
  subtitle: z.string().optional().or(z.literal('')),
  short_description: z.string().min(10, 'Short description is required'),
  full_description: z.string().optional().or(z.literal('')),
  icon_name: z.string().default('Briefcase'),
  image_url: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  banner_url: z.string().url('Must be a valid banner URL').optional().or(z.literal('')),
  key_responsibilities: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  industry_applications: z.array(z.string()).default([]),
  status: z.enum(['active', 'inactive']).default('active'),
  display_order: z.coerce.number().default(0),
  meta_title: z.string().optional().or(z.literal('')),
  meta_description: z.string().optional().or(z.literal('')),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must match'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'New passwords do not match',
  path: ['confirmPassword'],
});

export const SiteSettingsSchema = z.record(z.string(), z.string().optional());
