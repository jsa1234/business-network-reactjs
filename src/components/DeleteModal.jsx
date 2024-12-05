import React from "react";
import CommonApi from "@/api/CommonApi";

const DeleteModal = (props) => {
  const { delFn, forum, updateMyqueries } = props;

  const deleteForum = async () => {
    try {
      const res = await CommonApi.deleteData(
        `Forum/vendor/delete-queries/${forum}`,
        {},
        {}
      );

      console.log(res);
      updateMyqueries();

      delFn();
    } catch (error) {
      console.error("Error fetching business domains:", error);
    }
  };

  return (
    <div className="bg-black/40 h-screen w-screen fixed top-0 left-0 flex items-center justify-center">
      <div className="pt-8 pb-6 px-10 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold mb-10">Delete Forum</h2>
        <p className="mb-8 text-2xl">
          Are you sure you want to delete this forum?
        </p>
        <div className="flex gap-x-4">
          <button
            onClick={delFn}
            className="border border-black rounded-lg px-4 py-2 text-2xl"
          >
            Cancel
          </button>
          <button
            onClick={deleteForum}
            className="border border-r-red-600 bg-red-600 rounded-lg px-4 py-2 text-2xl text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
