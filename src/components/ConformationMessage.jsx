import React from "react";

const ConformationMessage = () => {
  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Form Submitted Successfully!
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Your details have been successfully submitted.
        </p>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleGoBack}
        >
          Return To Homepage
        </button>
      </div>
    </div>
  );
};

export default ConformationMessage;
