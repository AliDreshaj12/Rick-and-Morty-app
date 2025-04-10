import React, { useState } from "react";
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import CharacterList from './CharacterList';

function App() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const baseButtonClass = "px-4 py-2 rounded font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-opacity-50";
  const activeClass = "bg-green-500 text-white ring-green-300"; 
  const inactiveClass = "bg-gray-600 text-gray-200 hover:bg-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500"; // Inactive language button

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-green-600 dark:text-green-400 tracking-wider">
            {language === "en" ? "Rick and Morty Characters" : "Rick und Morty Charaktere"}
          </h1>
          <div className="flex justify-center space-x-3 sm:space-x-4 mb-8">
            <button
              onClick={() => handleLanguageChange("de")}
              className={`${baseButtonClass} ${language === 'de' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'de'} 
            >
              German
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`${baseButtonClass} ${language === 'en' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'en'}
            >
              English
            </button>
          </div>
          <CharacterList language={language} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;