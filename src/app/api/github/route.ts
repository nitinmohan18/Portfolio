import { NextResponse } from 'next/server';
import { getGithubUser, getGithubRepos } from '@/lib/github';

export async function GET() {
  try {
    const [user, repos] = await Promise.all([
      getGithubUser(),
      getGithubRepos()
    ]);
    
    return NextResponse.json({ user, repos });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
