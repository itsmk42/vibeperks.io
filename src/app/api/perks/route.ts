import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Perk } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src/lib/perks.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load perks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPerk: Perk = await request.json();
    
    // Basic validation
    if (!newPerk.company || !newPerk.title) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data: Perk[] = JSON.parse(fileContents);
    
    // Generate ID if missing
    if (!newPerk.id) {
        newPerk.id = Math.random().toString(36).substr(2, 9);
    }

    data.unshift(newPerk); // Add to top
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json(newPerk, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save perk' }, { status: 500 });
  }
}
