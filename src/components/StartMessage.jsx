/* eslint-disable react/prop-types */
import myImage from "../assets/Group Chat-amico 1.png";

export default function StartMessage({ showButton = true, onClickButton }) {
 
  console.log('Start message rerender !!!!! 🚧');

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-gray-500 font-medium text-xl">
          No message selected yet
        </h2>
        <img src={myImage} width={500} />
        {showButton && (
          <button
            onClick={onClickButton}
            className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md w-64 h-12 font-medium hover:bg-white hover:text-cyan-800 mx-4"
          >
            New Message
          </button>
        )}
      </div>
    </>
  );
}
