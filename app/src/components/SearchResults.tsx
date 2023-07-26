import { SearchResult } from "@/helpers";

const SearchResult = ({
  result,
  onSelect,
}: {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}) => {
  return (
    <div
      onClick={() => {
        onSelect(result);
      }}
      className="group relative"
    >
      <a
        className="group peer cursor-pointer"
        style={{ borderRadius: "20.88px" }}
      >
        <img
          src={`https://img.youtube.com/vi/${result.id}/hqdefault.jpg`}
          alt="Youtube thumbnail"
          className="h-full w-full object-cover"
        />
      </a>
    </div>
  );
};

export const SearchResults = ({
  results,
  onSelect,
}: {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}) => {
  return (
    <div className="flex min-h-[calc(100vh-var(--navbar-height)-var(--filterbar-height)-12px)] min-w-0 flex-shrink flex-grow flex-col">
      <div className="pb-24">
        <div className="grid content-start [--column-gap:12px] min-720:[--column-gap:24px] gap-x-[--column-gap] gap-y-20 min-720:gap-y-40 [--min-column-width:169px] min-720:[--min-column-width:208px] min-840:[--min-column-width:243px] [--max-column-count:7] [--total-gap-width:calc((var(--max-column-count)-1)*var(--column-gap))] [--max-column-width:calc((100%-var(--total-gap-width))/var(--max-column-count))] grid-cols-[repeat(auto-fill,minmax(max(var(--min-column-width),var(--max-column-width)),1fr))]">
          {results.map((r, i) => (
            <div key={i} className="flex flex-col gap-y-16">
              <SearchResult onSelect={onSelect} result={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
