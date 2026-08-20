import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FeedbackLog from '@/models/FeedbackLog';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { predictedSpecies, suggestedCorrectSpecies, confidence, comments } = body;

    if (!predictedSpecies || !suggestedCorrectSpecies) {
      return NextResponse.json(
        { success: false, error: 'Missing required feedback fields.' },
        { status: 400 }
      );
    }

    const dbConn = await connectToDatabase();
    if (dbConn) {
      await FeedbackLog.create({
        predictedSpecies,
        suggestedCorrectSpecies,
        confidence: confidence || 0.0,
        comments: comments || '',
        clientIp: request.headers.get('x-forwarded-for') || '127.0.0.1',
      });
      console.log(`📝 Active Learning Feedback recorded: "${predictedSpecies}" -> Corrected: "${suggestedCorrectSpecies}"`);
    }

    return NextResponse.json({
      success: true,
      message: 'Active Learning Feedback successfully submitted for retraining queue.',
    });
  } catch (error: any) {
    console.error('Feedback API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record feedback', details: error.message },
      { status: 500 }
    );
  }
}
