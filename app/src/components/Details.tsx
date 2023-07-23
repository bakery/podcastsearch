import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { SearchResult } from "@/helpers";

/*
h-52 grid-cols-[1fr,auto,1fr] items-center gap-16 border-b border-divider-primary px-8 pt-[2px]
*/

export const Details = ({
  onClose,
  result,
}: {
  onClose: () => void;
  result: SearchResult | null;
}) => {
  console.log("result", result);
  return result ? (
    <article
      className="grid h-full w-full overflow-hidden bg-bg-primary grid-rows-[min-content_1fr]"
      tabIndex={0}
    >
      <header className="grid w-full">
        <div className="flex h-full flex-row items-center justify-start gap-12">
          <span className="inline-flex flex-col items-stretch">
            <button
              onClick={() => {
                onClose();
              }}
              className="relative h-36 rounded-12 text-body-small-bold px-[10px] bg-bg-primary text-fg-primary hover:bg-bg-secondary active:bg-bg-secondary focus-visible:ring-4 focus-visible:ring-blue-200/50 cursor-pointer"
              type="button"
            >
              <span className="flex items-center justify-center gap-x-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  className="shrink-0"
                >
                  <title>close icon</title>
                  <path
                    d="M12 4L4 12"
                    stroke-width="2.0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M4 4L12 12"
                    stroke-width="2.0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </span>
          <div className="h-36 w-[2px] bg-divider-primary py-8"></div>
        </div>
      </header>
      <div className="relative overflow-hidden">
        <LiteYouTubeEmbed
          id={result.id}
          params={`start=${result.start}&autoplay=1`}
          poster="hqdefault"
          title={result.text}
        />
        <p>{result.text}</p>
      </div>
    </article>
  ) : null;
};
