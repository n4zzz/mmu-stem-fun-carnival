"use client";
import { useState } from "react";
import { FaLightbulb, FaRobot } from "react-icons/fa6";
import getExperimentSuggestion from "@/app/actions/getExperimentSuggestion";

const ExperimentSuggester = ({ resourceName, description }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    setSuggestion("");
    
    const result = await getExperimentSuggestion(resourceName, description);
    
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="mt-6 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
      <div className="flex items-center justify-between">
        <h3 className="text-indigo-900 font-bold flex items-center gap-2">
          <FaRobot className="text-xl" /> 
          AI Experiment Assistant
        </h3>
        
        <button
          onClick={handleSuggest}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {loading ? (
            "Thinking..."
          ) : (
            <>
              <FaLightbulb /> Suggest Experiment
            </>
          )}
        </button>
      </div>

      {suggestion && (
        <div className="mt-4 p-4 bg-white rounded-md border border-indigo-100 shadow-sm text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {suggestion}
        </div>
      )}
      
      {!suggestion && !loading && (
        <p className="mt-2 text-sm text-indigo-600">
          Click the button to get a unique AI-generated experiment idea for this resource!
        </p>
      )}
    </div>
  );
};

export default ExperimentSuggester;