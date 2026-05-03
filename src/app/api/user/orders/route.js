import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

async function getDB() {
  await client.connect();
  return client.db();
}

export async function GET(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDB();
  const data = await db
    .collection("orders")
    .findOne({ userId: session.user.id });
  return Response.json({ items: data?.items || [] });
}

export async function POST(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await request.json();
  const db = await getDB();

  await db
    .collection("orders")
    .updateOne(
      { userId: session.user.id },
      { $set: { userId: session.user.id, items } },
      { upsert: true },
    );

  return Response.json({ success: true });
}
