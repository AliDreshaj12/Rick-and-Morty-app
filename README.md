Rick and Morty Character List
This is a React project that uses Apollo Client to fetch data from the Rick and Morty GraphQL API. It allows users to browse characters from the Rick and Morty universe, filter and sort them by different criteria.

Features
View Characters: Users can see a list of characters from the "Rick and Morty" universe.

Filtering: Characters can be filtered by:

Status (Alive, Dead, Unknown)

Species (e.g., Human, Alien)

Sorting: Characters can be sorted by:

Name

Origin

Dynamic Data Loading: Using InfiniteScroll, more characters are loaded dynamically when needed.

Multilingual Support: Users can switch between English and German languages.

Technologies Used
React - For building the user interface.

Apollo Client - For managing GraphQL requests.

GraphQL - For querying data from the Rick and Morty API.

Bootstrap - For styling the interface and elements.

InfiniteScroll - For displaying additional characters as users scroll without refreshing the page.

Installation
Clone this repository:

bash
Copy
Edit
git clone https://github.com/username/rick-and-morty-character-list.git
Install dependencies:

bash
Copy
Edit
cd rick-and-morty-character-list
npm install
npm run dev the application :

Open the app at http://localhost:5173 in your browser.

Apollo Client Setup
This project uses Apollo Client to interact with the Rick and Morty GraphQL API. Below is the basic setup for Apollo Client:

javascript
Copy
Edit
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
  cache: new InMemoryCache(),
});
Usage
This project provides a simple interface for browsing characters. Users can filter and sort characters by specific criteria for more precise results.

Filter characters: Choose a Status and Species to filter the characters.

Sort characters: Select a sorting method (by name or origin).

Switch languages: Users can toggle between English and German to view character information in the desired language.

Screenshots
Main View:


Filtering and Sorting:


License
This project is licensed under the MIT License - see the LICENSE file for details.

