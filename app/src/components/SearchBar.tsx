import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const SearchBar = ({
  onChange,
}: {
  onChange: (query: string) => Promise<void>;
}) => {
  return (
    <div className="flex flex-1 justify-center px-2">
      <div className="w-full max-w-lg ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            autoFocus
            id="search"
            className="block w-full rounded-md border-0 bg-white py-4 px-3 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
            name="search"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onChange(event.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
