import Pagenavigation from '@/components/Pagenavigation'
import React from 'react'
import OpenQuotation from './OpenQuotation'

const page = () => {
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Open Quotation"
            navList={["Dashboard", "Quotation Request","Open Quotation"]}
            urlList={['/',"/quotationrequest","managenetwork/openquotation"]}
          />
        </div>
      </div>
      <div className="w-full mt-6">
        <OpenQuotation/>
      </div>
    </div>
  )
}

export default page