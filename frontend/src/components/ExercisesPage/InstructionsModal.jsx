/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import logo from "../../assets/gymnation-logo.png";

export default function InstructionsModal({
  gifUrl,
  name,
  instructions,
  open,
  setOpen,
}) {
  return (
    
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <img
              className="w-auto mx-auto max-h-52"
              src={gifUrl || logo}
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logo;
              }}
            />
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 mb-3"
                  >
                    {name
                      ? name.charAt(0).toUpperCase() + name.slice(1)
                      : "Exercise Instructions"}
                  </DialogTitle>
                  <div className="mt-2">
                    <ol className="text-sm text-gray-500 text-left">
                      {Array.isArray(instructions) ? (
                        instructions.map((instruction, index) => (
                          <li key={index} className="mb-5">{index+1}. {instruction}</li>
                        ))
                      ) : (
                        <li>No instructions available</li>
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
