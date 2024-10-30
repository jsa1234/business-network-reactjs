import Pagenavigation from "@/components/Pagenavigation";
import React from "react";

function Page() {
  const breadcrumbItems = ["Dashboard", "Quotation Request"];
  const urlList = ["/", "/dashboard", ""];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Quotation Request"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <button className="primary__btn">Add New</button>
        </div>
      </div>
      <div className="w-full table-container mt-6">
      <table className="table w-full">
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
</table>

      </div>
    </div>
  );
}

export default Page;
