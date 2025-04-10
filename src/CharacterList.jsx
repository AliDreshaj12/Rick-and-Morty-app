import React, { useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { useQuery } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';

import { GET_CHARACTERS } from "./queries";
import InfiniteScroll from "react-infinite-scroll-component";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'alive': return 'text-green-500 dark:text-green-400';
    case 'dead': return 'text-red-600 dark:text-red-500';
    default: return 'text-gray-600 dark:text-gray-400'; 
  }
};

const CharacterList = ({ language }) => {
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [fetchMoreError, setFetchMoreError] = useState(null);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const processedCharacters = useMemo(() => {
    if (!data?.characters?.results) return [];

    return [...data.characters.results]
      .filter((character) => {
        const statusMatch = statusFilter ? character.status?.toLowerCase() === statusFilter.toLowerCase() : true;
        const speciesMatch = speciesFilter ? character.species?.toLowerCase().includes(speciesFilter.toLowerCase()) : true;
        return statusMatch && speciesMatch;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return (a.name || '').localeCompare(b.name || '');
        } else if (sortBy === "origin") {
          const originA = a.origin?.name || '';
          const originB = b.origin?.name || '';
          return originA.localeCompare(originB);
        }
        return 0;
      });
  }, [data?.characters?.results, statusFilter, speciesFilter, sortBy]);

  const loadMoreData = () => {
    if (!data?.characters?.info?.next) return;

    const nextPage = data.characters.info.next;
    setFetchMoreError(null);

    fetchMore({
      variables: { page: nextPage },
    }).catch(err => {
      console.error("Error fetching more characters:", err);
      setFetchMoreError(language === "en" ? "Failed to load more characters." : "Fehler beim Laden weiterer Charaktere.");
    });
  };

  const hasMore = data?.characters?.info?.next !== null;

  const messages = {
    en: {
      loadingInitial: "Loading initial characters...",
      loadingMore: "Loading more characters...",
      errorLoading: `Error loading data: ${error?.message || 'Unknown error'}`,
      errorFetchingMore: "Failed to load more characters.",
      noCharactersFound: "No characters found matching criteria.",
      endMessage: "Yay! You have seen it all",
      filterStatus: "Status:",
      filterSpecies: "Species:",
      filterSortBy: "Sort By:",
      optionAll: "All",
      optionAlive: "Alive",
      optionDead: "Dead",
      optionUnknown: "Unknown",
      optionName: "Name",
      optionOrigin: "Origin",
      placeholderSpecies: "e.g., Human, Alien",
      labelStatus: "Status:",
      labelSpecies: "Species:",
      labelGender: "Gender:",
      labelOrigin: "Origin:",
      valueUnknown: "Unknown",
      valueUnnamed: "Unnamed",
    },
    de: {
      loadingInitial: "Lade initiale Charaktere...",
      loadingMore: "Lädt mehr Charaktere...",
      errorLoading: `Fehler beim Laden der Daten: ${error?.message || 'Unbekannter Fehler'}`,
      errorFetchingMore: "Fehler beim Laden weiterer Charaktere.",
      noCharactersFound: "Keine Charaktere entsprechen den Kriterien.",
      endMessage: "Yay! Du hast alles gesehen",
      filterStatus: "Status:",
      filterSpecies: "Spezies:",
      filterSortBy: "Sortieren nach:",
      optionAll: "Alle",
      optionAlive: "Lebendig",
      optionDead: "Tot",
      optionUnknown: "Unbekannt",
      optionName: "Name",
      optionOrigin: "Herkunft",
      placeholderSpecies: "z.B. Mensch, Alien",
      labelStatus: "Status:",
      labelSpecies: "Spezies:",
      labelGender: "Geschlecht:",
      labelOrigin: "Herkunft:",
      valueUnknown: "Unbekannt",
      valueUnnamed: "Unbenannt",
    }
  };

  const t = messages[language];

  if (loading && !data) {
    return <p className="text-center text-xl text-yellow-600 dark:text-yellow-400 py-10">{t.loadingInitial}</p>;
  }

  if (error && !data) {
    return <p className="text-center text-xl text-red-600 dark:text-red-500 py-10">{t.errorLoading}</p>;
  }

  return (
    <div>
      <div className="mb-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-4 md:gap-6">
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="status-filter" className="flex-shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {t.filterStatus}
          </label>
          <select
            id="status-filter"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="flex-grow p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded"
          >
            <option value="">{t.optionAll}</option>
            <option value="Alive">{t.optionAlive}</option>
            <option value="Dead">{t.optionDead}</option>
            <option value="unknown">{t.optionUnknown}</option>
          </select>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="species-filter" className="flex-shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {t.filterSpecies}
          </label>
          <input
            type="text"
            id="species-filter"
            placeholder={t.placeholderSpecies}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            value={speciesFilter}
            className="flex-grow p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded"
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="sort-by" className="flex-shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {t.filterSortBy}
          </label>
          <select
            id="sort-by"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="flex-grow p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded"
          >
            <option value="name">{t.optionName}</option>
            <option value="origin">{t.optionOrigin}</option>
          </select>
        </div>
      </div>
      {fetchMoreError && (
        <p className="text-center text-sm text-red-500 dark:text-red-400 mb-4">{fetchMoreError}</p>
      )}
      {processedCharacters.length === 0 && (
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">{t.noCharactersFound}</p>
      )}
      <InfiniteScroll
  dataLength={processedCharacters.length}
  next={loadMoreData}
  hasMore={hasMore}
  loader={<p className="text-center text-lg text-gray-500 dark:text-gray-400 py-5">{t.loadingMore}</p>}
  endMessage={
    processedCharacters.length > 0 && (
      <p className="text-center text-lg text-gray-600 dark:text-gray-500 py-5">
        <b>{t.endMessage}</b>
      </p>
    )
  }
>
<div className="container my-4">
  <div className="row">
    {processedCharacters.map((character) => (
      <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
        <div className="card h-100 text-center">
          {character.image && (
            <img
              src={character.image}
              className="card-img-top rounded-circle mx-auto mt-3"
              alt={character.name || 'Character'}
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{character.name || t.valueUnnamed}</h5>
            <p className="card-text mb-1">
              <strong>{t.labelStatus}:</strong> {character.status || t.valueUnknown}
            </p>
            <p className="card-text mb-1">
              <strong>{t.labelSpecies}:</strong> {character.species || t.valueUnknown}
            </p>
            <p className="card-text mb-1">
              <strong>{t.labelGender}:</strong> {character.gender || t.valueUnknown}
            </p>
            <p className="card-text">
              <strong>{t.labelOrigin}:</strong> {character.origin?.name || t.valueUnknown}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</InfiniteScroll>


    </div>
  );
};

CharacterList.propTypes = {
  language: PropTypes.oneOf(['en', 'de']).isRequired,
};

export default CharacterList;
