import { NextRequest, NextResponse } from "next/server";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { errors: [{ message: "GITHUB_TOKEN이 서버에 설정되어 있지 않습니다." }] },
      { status: 500 },
    );
  }

  const body = await request.text();

  const upstream = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "logit-bff",
    },
    body,
  });

  const payload = await upstream.text();

  return new NextResponse(payload, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
