import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Plant from '@/models/Plant';

export async function GET(
  request: NextRequest,
  { params }: { params: { species: string } }
) {
  try {
    const rawSpecies = params.species;
    if (!rawSpecies) {
      return NextResponse.json(
        { success: false, error: 'Species parameter is required' },
        { status: 400 }
      );
    }

    const decodedSpecies = decodeURIComponent(rawSpecies).trim();
    await connectToDatabase();

    // Query flexible matching across datasetLabel, scientificName, commonName, or ayurvedicName
    const plant = await Plant.findOne({
      $or: [
        { datasetLabel: decodedSpecies },
        { scientificName: { $regex: new RegExp(`^${decodedSpecies}$`, 'i') } },
        { commonName: { $regex: new RegExp(decodedSpecies, 'i') } },
        { ayurvedicName: { $regex: new RegExp(decodedSpecies, 'i') } },
      ],
    });

    if (!plant) {
      return NextResponse.json(
        {
          success: false,
          error: `Plant species record not found for '${decodedSpecies}'`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: plant,
    });
  } catch (error: any) {
    console.error('API Error in /api/plants/[species]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
