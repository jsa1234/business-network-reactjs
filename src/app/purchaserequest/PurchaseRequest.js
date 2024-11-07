"use client";

import Prcard from "@/components/Prcard";
import Search from "../../../public/assests/icons/search.svg"
import Datepicker from "@/components/datepicker";
const PurchaseRequest = () => {
    return (
        <>
         <div className="filter-group">
        <div className="form">
          <Search className="fa fa-search"></Search>
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Product Name..."
          />
          <label className="dropdown-list">Sort by</label>
          <select id="dropdown" className="dropdownSelect">
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <Datepicker />
        </div>
      </div>

      <div className="quotationwraper">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
        
          <Prcard
            key={row}
            name="Earthly Delights Trading"
            deliverydate="04/11/2024"
            prdate="04/11/2024"
            status="Urgent"
           
          />
        ))}
      </div>

        </>
    );
};

export default PurchaseRequest;