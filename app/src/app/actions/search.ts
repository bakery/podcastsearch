"use server";

import { pipeline, env } from "@xenova/transformers";
import { ChromaClient } from "chromadb";
import { SearchResult } from "@/helpers";

class TransformersEmbeddingFunction {
  private pipelinePromise: Promise<any> | null;

  constructor({
    model = "Xenova/all-MiniLM-L6-v2",
    revision = "main",
    quantized = false,
    progress_callback = undefined,
  }: {
    model?: string;
    revision?: string;
    quantized?: boolean;
    progress_callback?: Function | undefined;
  } = {}) {
    // Store a promise that resolves to the pipeline
    this.pipelinePromise = new Promise(async (resolve, reject) => {
      try {
        resolve(
          await pipeline("feature-extraction", model, {
            quantized,
            revision,
            progress_callback,
          })
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  public async generate(texts: string[]): Promise<number[][]> {
    let pipe = await this.pipelinePromise;
    let output = await pipe(texts, { pooling: "mean", normalize: true });
    return output.tolist();
  }
}

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
