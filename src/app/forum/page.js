"use client";
import Pagenavigation from "@/components/Pagenavigation";
import Forum from "./Forum";
import Modal from "@/components/modal";
import { useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const breadcrumbItems = ["Dashboard", "Biz Forum"];
  const urlList = ["/", "/forum"];
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Biz Forum"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <button className="primary__btn mt-6"
         onClick={handleOpenModal}>+ Create New Query</button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      <div className="w-full mt-6">
        <Forum />
      </div>
    </div>
  );
};

export default Page;
