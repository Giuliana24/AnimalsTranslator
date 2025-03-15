import React from "react";

interface LanguageSelectorProps {
  selectedLanguage: "duck" | "cat" | "frog";
  onSelectLanguage: (language: "duck" | "cat" | "frog") => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <h3 className="w-full text-center text-lg font-bold mb-2">Choose your animal:</h3>
      
      <button
        onClick={() => onSelectLanguage("duck")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-['Baloo_2'] font-bold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500
          ${selectedLanguage === "duck" 
            ? "bg-yellow-200 border-2 border-yellow-400" 
            : "bg-yellow-100 border-2 border-yellow-300 hover:bg-yellow-200"
          }`}
      >
        <span className="text-2xl">🦆</span> Duck
      </button>
      
      <button
        onClick={() => onSelectLanguage("cat")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-['Baloo_2'] font-bold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-500
          ${selectedLanguage === "cat" 
            ? "bg-gray-200 border-2 border-gray-400" 
            : "bg-gray-100 border-2 border-gray-300 hover:bg-gray-200"
          }`}
      >
        <span className="text-2xl">🐱</span> Cat
      </button>
      
      <button
        onClick={() => onSelectLanguage("frog")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-['Baloo_2'] font-bold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500
          ${selectedLanguage === "frog" 
            ? "bg-green-200 border-2 border-green-400" 
            : "bg-green-100 border-2 border-green-300 hover:bg-green-200"
          }`}
      >
        <span className="text-2xl">🐸</span> Frog
      </button>
    </div>
  );
};

export default LanguageSelector;
