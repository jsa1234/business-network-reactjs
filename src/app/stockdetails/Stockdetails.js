"use client";
import Search from "../../../public/assests/icons/search.svg"
const Stockdetails = () => {
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

         
        </div>
      </div>
        </>
    );
};

export default Stockdetails;