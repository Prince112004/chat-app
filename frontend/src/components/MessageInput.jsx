import React from "react";
import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled, theme } = useChatStore(); // 1. Get theme

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Handle case where user cancels file selection
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      // Use 'sm:p-4' for small screens and up, use 'p-3' for extra small screens
      className={`p-2 sm:p-4 border-t ${
        // 2. Theme for container border
        theme === "dark" ? "border-slate-700/50" : "border-gray-300"
      }`}
    >
      {imagePreview && (
        // Adjust max-width on smaller screens
        <div className="max-w-full sm:max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              // Smaller image on smaller screens, 'w-16 h-16' vs 'w-20 h-20'
              src={imagePreview}
              alt="Preview"
              className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border ${
                // 3. Theme for image preview border
                theme === "dark" ? "border-slate-700" : "border-gray-300"
              }`}
            />
            <button
              onClick={removeImage}
              // Smaller button for the 'X' icon
              className={`absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors ${
                // 4. Theme for "X" (remove image) button
                theme === "dark"
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              type="button"
            >
              <XIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        // max-w-full on smaller screens
        className="max-w-full sm:max-w-3xl mx-auto flex space-x-1 sm:space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          // Smaller vertical padding on smaller screens: 'py-3' vs 'py-4'
          className={`flex-1 rounded-lg py-3 sm:py-4 px-4 outline-none border ${
            // 5. Theme for text input (bg, border, text, placeholder)
            theme === "dark"
              ? "bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500"
              : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
          }`}
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          // Smaller horizontal padding: 'px-3' vs 'px-4'
          className={`rounded-lg px-3 sm:px-4 transition-colors ${
            // 6. Theme for image icon button
            theme === "dark"
              ? "bg-slate-800/50 text-slate-400 hover:text-slate-200"
              : "bg-gray-100 text-gray-500 hover:text-gray-700"
          } ${
            // 7. Theme for active image icon (when image is selected)
            imagePreview
              ? theme === "dark"
                ? "text-cyan-500"
                : "text-cyan-600"
              : ""
          }`}
        >
          {/* Smaller icon size: 'w-4 h-4' vs 'w-5 h-5' */}
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          // 8. Send button gradient works well on both themes - NO CHANGE NEEDED
          // Smaller padding: 'px-3 py-1' vs 'px-4 py-2'
          className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-3 py-1 sm:px-4 sm:py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" // Added flex classes to center icon
        >
          {/* Smaller icon size: 'w-4 h-4' vs 'w-5 h-5' */}
          <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;