"use client";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-[90%] md:w-[600px]">
          <h2 className="text-4xl font-semibold mb-4">Create New Query</h2>
          <form>
            <div className="mb-4">
              <input
                id="title"
                type="text"
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl"
                placeholder="Enter Title"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xl"
                placeholder="Enter Description"
              ></textarea>
            </div>
            <div className="flex justify-start gap-3">
              <button
                type="button"
                className="px-10 py-4 bg-white border text-xl border-gray-300 text-orange-500 rounded-lg hover:bg-gray-100 transition"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-4 bg-orange-500 text-white rounded-lg text-xl"
              >
                Replay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
