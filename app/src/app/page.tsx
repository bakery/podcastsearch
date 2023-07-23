"use client";

import { useState, Fragment } from "react";
import { search } from "./actions/search";
import { Dialog, Transition } from "@headlessui/react";
import { SearchResult } from "@/helpers";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { Details } from "@/components/Details";

export default function Home() {
  const [selectedSearchResult, setSelectedSearchResult] =
    useState<SearchResult | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <>
      <main className="-mt-7">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <SearchBar
            onChange={async (query) => {
              const rs = await search(query);
              setResults(rs);
            }}
          />
          <div className="pt-10">
            <SearchResults
              onSelect={(result) => {
                setSelectedSearchResult(result);
              }}
              results={results}
            />
          </div>
        </div>
      </main>

      <Transition.Root show={selectedSearchResult != null} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 min-h-full"
          // initialFocus={cancelButtonRef}
          onClose={() => {
            setSelectedSearchResult(null);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white px-4 pb-4 text-left shadow-xl transition-all min-h-full w-full h-full ">
                <Details
                  result={selectedSearchResult}
                  onClose={() => {
                    setSelectedSearchResult(null);
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
