import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, image } = await request.json();

  await auth.api.updateUser({
    headers: request.headers,
    body: { name, image },
  });

  return NextResponse.json({ success: true });
}
