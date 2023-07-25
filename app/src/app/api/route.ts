import { NextResponse } from "next/server";
import { pipeline, env } from "@xenova/transformers";
// import "@xenova/transformers";
import { ChromaClient } from "chromadb";
import { SearchResult } from "@/helpers";

// @ts-ignore
env.allowLocalModels = false;
// export const runtime = "edge";

class TransformersEmbeddingFunction {
  private pipelinePromise: Promise<any> | null;

  /**
   * TransformersEmbeddingFunction constructor.
   * @param options The configuration options.
   * @param options.model The model to use to calculate embeddings. Defaults to 'Xenova/all-MiniLM-L6-v2', which is an ONNX port of `sentence-transformers/all-MiniLM-L6-v2`.
   * @param options.revision The specific model version to use (can be a branch, tag name, or commit id). Defaults to 'main'.
   * @param options.quantized Whether to load the 8-bit quantized version of the model. Defaults to `false`.
   * @param options.progress_callback If specified, this function will be called during model construction, to provide the user with progress updates.
   */
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

export async function POST() {
  const query = "marketing";
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

  return NextResponse.json(results);
  // return NextResponse.json({ result: typeof pipeline });
}
