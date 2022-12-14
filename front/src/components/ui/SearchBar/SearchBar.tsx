import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar = ({ setOpen }: Props) => (
  <div
    className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end"
    data-cy="SearchBar"
  >
    <div className="w-full max-w-lg lg:max-w-xs" onClick={() => setOpen(true)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
            data-cy="search-icon"
          />
        </div>
        <input
          id="search"
          name="search"
          disabled
          className=" cursor-text block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  </div>
);

export default SearchBar;
