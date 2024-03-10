import React from "react";

function createEvent() {
  return (
    <>
      <div className="text-center font-black flex">createEvent</div>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />

      <label htmlFor="date">Date</label>
      <input type="text" name="date" />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" />

      <label htmlFor="isPaid">Paid</label>
      <input type="radio" name="isPaid" id="isPaid" />

      <label htmlFor="price">Price</label>
      <input type="number" name="price" />

      <label htmlFor="registrationUrl">RegistrationUrl</label>
      <input type="registrationUrl" name="registrationUrl" />

      <label htmlFor="categories">Categories</label>
      <select name="categories" id="categories">
        <option value="">A</option>
        <option value="">B</option>
        <option value="">C</option>
      </select>

      <label htmlFor="capacity">Capacity</label>
      <input type="number" name="capacity" />

      <button type="submit">Submit</button>
    </>
  );
}

export default createEvent;
