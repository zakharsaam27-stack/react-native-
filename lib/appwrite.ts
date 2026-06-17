import { Account, Client, Databases, Models, Query } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);
export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;
export const HABITS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!;
export const COMPLETIONS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID!;

const LIST_PAGE_SIZE = 100;

export async function listAllDocuments<T extends Models.Document>(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
): Promise<T[]> {
  const documents: T[] = [];
  let cursor: string | undefined;

  while (true) {
    const pageQueries = [...queries, Query.limit(LIST_PAGE_SIZE)];
    if (cursor) pageQueries.push(Query.cursorAfter(cursor));

    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      pageQueries,
    );
    documents.push(...(response.documents as unknown as T[]));

    if (response.documents.length < LIST_PAGE_SIZE) break;
    cursor = response.documents[response.documents.length - 1].$id;
  }

  return documents;
}

export async function deleteAllDocuments(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
): Promise<void> {
  const documents = await listAllDocuments(databaseId, collectionId, queries);
  await Promise.all(
    documents.map((doc) =>
      databases.deleteDocument(databaseId, collectionId, doc.$id),
    ),
  );
}

export interface RealTimeResponse {
  events: string[];
  payload: any;
}
