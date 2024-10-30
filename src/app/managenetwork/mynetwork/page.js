import Pagenavigation from "@/components/Pagenavigation";
import CustomPaginationActionsTable from "@/components/Test";
import React from "react";

function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Network", "My Networks"];
  const urlList = ["/", "/managenetwork", "/managenetwork/mynetwork"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="My Networks"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <button className="primary__btn">Add List</button>
        </div>
      </div>
      <div className="w-full table-container mt-6">
        <div className="filter-group">
          <div className="form">
          <svg className="fa fa-search" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M8.5 13.5C11.2614 13.5 13.5 11.2614 13.5 8.5C13.5 5.73858 11.2614 3.5 8.5 3.5C5.73858 3.5 3.5 5.73858 3.5 8.5C3.5 11.2614 5.73858 13.5 8.5 13.5Z" stroke="#778294" strokeWidth="1.5"/>
<path d="M12.0961 12.0961L16 16" stroke="#778294" strokeWidth="1.5" strokeLinecap="square"/>
</svg>

            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
          </div>
        </div>
        {/* <table className="table w-full">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Total Suppliers</th>
              <th>Total Retailers</th>
              <th>No.of Customers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Widget A</td>
              <td>WID-001</td>
              <td>10</td>
              <td>25</td>
              <td>200</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Gadget B</td>
              <td>GAD-002</td>
              <td>15</td>
              <td>30</td>
              <td>150</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Device C</td>
              <td>DEV-003</td>
              <td>8</td>
              <td>20</td>
              <td>175</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Thingamajig D</td>
              <td>THI-004</td>
              <td>12</td>
              <td>22</td>
              <td>180</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Contraption E</td>
              <td>CON-005</td>
              <td>20</td>
              <td>35</td>
              <td>250</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Apparatus F</td>
              <td>APP-006</td>
              <td>18</td>
              <td>28</td>
              <td>160</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Gizmo G</td>
              <td>GIZ-007</td>
              <td>14</td>
              <td>19</td>
              <td>190</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Tool H</td>
              <td>TOO-008</td>
              <td>16</td>
              <td>27</td>
              <td>210</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Implement I</td>
              <td>IMP-009</td>
              <td>9</td>
              <td>18</td>
              <td>160</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Tool H</td>
              <td>TOO-008</td>
              <td>16</td>
              <td>27</td>
              <td>210</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Implement I</td>
              <td>IMP-009</td>
              <td>9</td>
              <td>18</td>
              <td>160</td>
            </tr>
          </tbody>
        </table> */}
        <CustomPaginationActionsTable/>
      </div>
    </div>
  );
}
export default Page;
