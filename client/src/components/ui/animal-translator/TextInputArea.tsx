import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here..."
        className="w-full h-40 p-4 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent font-['Nunito'] text-lg"
      />
    </div>
  );
};

export default TextInputArea;
