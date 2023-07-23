export interface SearchResult {
  source: string;
  id: string;
  text: string | null;
  start: number;
  end: number;
}
