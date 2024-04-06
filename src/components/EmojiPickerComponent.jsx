/* eslint-disable react/prop-types */
import EmojiPicker from "emoji-picker-react";

const EmojiPickerComponent = ({ onEmojiClick }) => {
  const pickerStyle = {
    position: "absolute",
    bottom: "50px",
    left: "40%",
    transform: "translateX(-50%)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  };

  return (
    <div style={pickerStyle}>
      <EmojiPicker onEmojiClick={onEmojiClick} height={400} />
    </div>
  );
};

export default EmojiPickerComponent;
