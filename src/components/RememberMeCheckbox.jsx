import { useState } from "react";

function RememberMeCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <label className=" text-gray-600">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="ms-3 mt-2"
      />
      Remember Me
    </label>
  );
}

export default RememberMeCheckbox;
