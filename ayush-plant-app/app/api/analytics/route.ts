import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import PredictionLog from '@/models/PredictionLog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const totalScans = await PredictionLog.countDocuments({});
    const lowConfidenceScans = await PredictionLog.countDocuments({ isLowConfidence: true });

    // Aggregation for most queried species
    const topQueriedSpecies = await PredictionLog.aggregate([
      { $group: { _id: '$species', count: { $sum: 1 }, avgConfidence: { $avg: '$confidence' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Recent 10 scans
    const recentScans = await PredictionLog.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('species confidence isLowConfidence createdAt');

    return NextResponse.json({
      success: true,
      supplyChainInsights: {
        totalScans,
        lowConfidenceScans,
        adulterationAlertRate: totalScans > 0 ? ((lowConfidenceScans / totalScans) * 100).toFixed(1) + '%' : '0%',
        mostQueriedSpecies: topQueriedSpecies.map((item) => ({
          species: item._id,
          scanCount: item.count,
          averageConfidence: (item.avgConfidence * 100).toFixed(1) + '%',
        })),
        recentScans,
      },
    });
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics', details: error.message },
      { status: 500 }
    );
  }
}
