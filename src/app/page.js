import Pagenavigation from "@/components/Pagenavigation";

function Page() {
  const urlList = ["/", "/dashboard", ""];
  return (
    <>
     <div className="bus__body w-full pl-9 mt-6 pr-3">
     <div className="flex justify-between">
     <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Dashboard"
            urlList={urlList}
          />
        </div>
      </div>
     </div>
    </>
);
}

export default Page;
