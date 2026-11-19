export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { InquiryModel } from '@/models/Inquiry';
import { queryOne } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiryMetrics = await InquiryModel.getDashboardMetrics();
    const { inquiries: recentInquiries } = await InquiryModel.getAll({ limit: 5 });

    const servicesCount = await queryOne<any>('SELECT COUNT(*) as cnt FROM services;');
    const industriesCount = await queryOne<any>('SELECT COUNT(*) as cnt FROM industries;');
    const messagesCount = await queryOne<any>('SELECT COUNT(*) as cnt FROM contact_messages;');

    return NextResponse.json({
      metrics: {
        totalInquiries: inquiryMetrics.total,
        newInquiries: inquiryMetrics.newCount,
        inProgressInquiries: inquiryMetrics.inProgress,
        contactedInquiries: inquiryMetrics.contacted,
        convertedInquiries: inquiryMetrics.converted,
        totalServices: servicesCount?.cnt || 0,
        totalIndustries: industriesCount?.cnt || 0,
        totalMessages: messagesCount?.cnt || 0,
      },
      monthlyStats: inquiryMetrics.monthlyStats,
      categoryStats: inquiryMetrics.categoryStats,
      recentInquiries,
    });
  } catch (error: any) {
    console.error('Dashboard metrics error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
