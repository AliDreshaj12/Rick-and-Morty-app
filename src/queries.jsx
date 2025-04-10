import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int) { # Variable for page number
    characters(page: $page) {
      info {
        count # Total number of characters
        pages # Total number of pages
        next  # Number of the next page (null if none)
        prev  # Number of the previous page (null if none)
      }
      results {
        id      # Unique identifier
        name    # Character's name
        status  # Character's status (Alive, Dead, unknown)
        species # Character's species
        gender  # Character's gender
        origin {
          name  # Name of the character's origin location
        }
        image   # URL of the character's image
      }
    }
  }
`;