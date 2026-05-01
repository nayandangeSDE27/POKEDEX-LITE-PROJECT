import { auth } from '@/lib/auth';
import { getFavoritesFromDB, addFavoriteToDB, removeFavoriteFromDB } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const favorites = await getFavoritesFromDB(session.user.id);
  return NextResponse.json({ favorites });
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  const ok = await addFavoriteToDB(session.user.id, name);
  return NextResponse.json({ ok });
}

export async function DELETE(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  const ok = await removeFavoriteFromDB(session.user.id, name);
  return NextResponse.json({ ok });
}
