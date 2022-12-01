import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactPlayer from "react-player";
import { Result } from "../../../../types/api-interfaces";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  video: Result;
};

const TraillerModal = ({ open, setOpen, video }: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" max-w-full bg-black relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-3/4 sm:p-6">
                <button
                  className="absolute right-5 top-3 items-center rounded-full border-2 bg-black p-1 text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 border-blue-500"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="h-5 w-5 stroke-2" aria-hidden="true" />
                </button>
                <h3 className="text-xl font-bold ml-3 py-3 text-white">
                  Bande-annonce
                </h3>

                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                  width="100%"
                  controls={true}
                  height="50vh"
                  light={true}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TraillerModal;
