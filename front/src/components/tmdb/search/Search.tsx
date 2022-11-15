import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { getSearchResults } from "../../../api/tmdb.api";
import { Result } from "../../../types/search";
import FullScreenLoader from "../../ui/FullScreenLoader/FullScreenLoader";
import { RadialProgress } from "react-daisyui";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getColor = (value: number) => {
  if (value >= 7 && value <= 10) return " text-success";
  else if (value >= 4 && value <= 7) return " text-warning";
  else if (value >= 0 && value <= 4) return " text-error";
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Search = ({ open, setOpen }: Props) => {
  const [query, setQuery] = useState("");
  const debouncedFilter = useDebounce(query, 500);

  // GET RECENT MOVIES
  const recentMovies = useQuery(["movies.recent"], () =>
    getSearchResults("harry")
  );

  const searchContent = useQuery(
    ["search", debouncedFilter],
    () => getSearchResults(debouncedFilter),
    { enabled: Boolean(debouncedFilter), placeholderData: recentMovies.data }
  );

  if (recentMovies.isLoading) return <FullScreenLoader />;

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-500 overflow-hidden rounded-xl bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all shadow-black">
              <Combobox
                onChange={(content: Result) =>
                  (window.location =
                    `/tmdb/details/${content.media_type}/${content.id}` as any)
                }
              >
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-200 placeholder-gray-300 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    {(query === "" ||
                      searchContent.data?.results?.length! > 0) && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex divide-x divide-gray-500"
                      >
                        <div
                          className={classNames(
                            "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                            activeOption! && "sm:h-96"
                          )}
                        >
                          {query === "" && (
                            <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-300">
                              Recent searches
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-white">
                            {recentMovies.isLoading && "Loading..."}
                            {(query === ""
                              ? (recentMovies.data?.results as Result[])
                              : (searchContent.data?.results as Result[])
                            ).map((content) => (
                              <Combobox.Option
                                as="div"
                                key={content.id}
                                value={content}
                                className={({ active }) =>
                                  classNames(
                                    "flex cursor-default select-none items-center rounded-md p-2",
                                    active ? "bg-gray-700 text-white" : ""
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <img
                                      src={`https://image.tmdb.org/t/p/w220_and_h330_face/${
                                        content.poster_path as string
                                      }`}
                                      alt=""
                                      className="h-6 w-6 flex-none rounded-full"
                                    />
                                    <span className="ml-3 flex-auto truncate">
                                      {content.media_type === "movie"
                                        ? content.title
                                        : content.name}
                                    </span>
                                    {active && (
                                      <ChevronRightIcon
                                        className="ml-3 h-5 w-5 flex-none text-gray-200"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </div>
                        </div>

                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-500 overflow-y-auto sm:flex">
                            <div className="flex-none p-4 text-center">
                              <img
                                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${
                                  activeOption.backdrop_path as string
                                }`}
                                alt=""
                                className="mx-auto h-16 w-16 rounded-full"
                              />
                              <h2 className="mt-3 font-semibold text-white">
                                {activeOption.title}
                              </h2>
                              <p className="text-sm leading-6 text-gray-200">
                                {activeOption.media_type}
                              </p>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6">
                              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-100">
                                <dt className="col-end-1 font-semibold text-white">
                                  Original language
                                </dt>
                                <dd>{activeOption.original_language}</dd>
                                <dt className="col-end-1 font-semibold text-white">
                                  Realease date
                                </dt>
                                <dd className="truncate">
                                  {activeOption.release_date}
                                </dd>
                                <dt className="col-end-1 font-semibold text-white">
                                  Popularity
                                </dt>
                                <dd className="relative">
                                  <RadialProgress
                                    size="3rem"
                                    value={activeOption.vote_average! * 10}
                                    className={
                                      "bg-gray-800 absolute text-sm font-bold shadow-md shadow-black" +
                                      getColor(activeOption.vote_average!)
                                    }
                                  >
                                    {activeOption.vote_average! * 10}%
                                  </RadialProgress>
                                </dd>
                              </dl>
                              <button
                                type="button"
                                className="mt-6 w-full rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                              >
                                More details
                              </button>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}

                    {query !== "" && searchContent.data?.results?.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <VideoCameraSlashIcon
                          className="mx-auto h-6 w-6 text-gray-200"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-white">
                          No content found
                        </p>
                        <p className="mt-2 text-gray-200">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Search;
