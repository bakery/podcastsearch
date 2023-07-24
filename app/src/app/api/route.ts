import { NextResponse } from "next/server";
import { pipeline, env } from "@xenova/transformers";
// import "@xenova/transformers";
// import { ChromaClient, TransformersEmbeddingFunction } from "chromadb";
import { SearchResult } from "@/helpers";

// const client = new ChromaClient({
//   path: process.env.CHROMA_SERVER_URL,
// });
// const transcriptsCollectionParams = {
//   name: "transcripts",
//   embeddingFunction: new TransformersEmbeddingFunction(),
// };

export const runtime = "edge";

export async function POST() {
  // const query = "marketing";
  // let transcripts = await client.getCollection(transcriptsCollectionParams);
  // const r = await transcripts.query({
  //   queryTexts: query,
  //   nResults: 10,
  // });

  // const results: SearchResult[] = [];

  // for (let i = 0; i < r.documents[0].length; i++) {
  //   const d = r.documents[0][i];
  //   const md = r.metadatas[0][i];
  //   r.distances;

  //   results.push({
  //     source: md?.source as string,
  //     id: md?.id as string,
  //     text: d,
  //     start: Math.floor(md?.start as number),
  //     end: Math.floor(md?.end as number),
  //   });
  // }

  // return NextResponse.json(results);
  return NextResponse.json({ result: typeof pipeline });
}
