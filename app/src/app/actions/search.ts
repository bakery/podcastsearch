"use server";

import { ChromaClient, TransformersEmbeddingFunction } from "chromadb";
import "@xenova/transformers";
import { SearchResult } from "@/helpers";

const client = new ChromaClient({
  path: process.env.CHROMA_SERVER_URL,
});
const transcriptsCollectionParams = {
  name: "transcripts",
  embeddingFunction: new TransformersEmbeddingFunction(),
};

export async function initChroma() {
  let transcripts = await client.getCollection(transcriptsCollectionParams);

  console.log(">>>>>>>>>>>> got transcripts", transcripts);

  return {
    transcripts: await transcripts.count(),
  };
}

export async function search(query: string) {
  let transcripts = await client.getCollection(transcriptsCollectionParams);
  const r = await transcripts.query({
    queryTexts: query,
    nResults: 10,
  });

  const results: SearchResult[] = [];

  for (let i = 0; i < r.documents[0].length; i++) {
    const d = r.documents[0][i];
    const md = r.metadatas[0][i];
    r.distances;

    results.push({
      source: md?.source as string,
      id: md?.id as string,
      text: d,
      start: Math.floor(md?.start as number),
      end: Math.floor(md?.end as number),
    });
  }

  return results;
}
