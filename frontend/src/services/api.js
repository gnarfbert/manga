var BASE_URL = "https://graphql.anilist.co"

var DB_URL = "http://localhost:8080/reviews"


var query = `
query ($perPage: Int!) {
  Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
    }
    media(
      type: MANGA
      format: MANGA
      sort: [SCORE_DESC, FAVOURITES_DESC]
    ) {
      description
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      startDate {
        year
      }
    }
  }
}
`;

var searchQuery = `
query ($pageNum: Int, $perPage: Int, $title: String) {
  Page(page: $pageNum, perPage: $perPage) {
    media (search: $title, sort: [SCORE_DESC], type: MANGA, isAdult: false){
      title {
        romaji
      }
      id
      description
      startDate {
        year
      }
      coverImage {
        large
      }
    }
  }
}
`
var trailerQuery = `
query ($id: Int) {
  Media (id: $id){
    trailer {
      site
      id
    }
    id
  }
}
`

var commentArray = []

async function fetchPopularPage(page = 1, perPage = 20) {
  const result = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify ({
      query: query,
      variables: {page: page, perPage :perPage}
    })
  });

  const json = await result.json();
  if (json.errors) {
    return 0
  }
  return json.data
}

async function fetchSearchQuery(searchTitle, page = 1, perPage = 20,) {
  const searchResult = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: searchQuery,
      variables: {pageNum: page, perPage: perPage, title: searchTitle}
    })
  })
  const resultJson = await searchResult.json()
  return resultJson.data.Page.media

}

async function fetchTrailer(mangaID) {
  const trailerResult = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: trailerQuery,
      variables: {id: mangaID}
    })
  })
  const trailerResultJSON = await trailerResult.json()
  return trailerResultJSON.data.Media

}

async function postComments(mangaId, comment) {
  await fetch(DB_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: mangaId, userComment: comment})
  })
}

async function fetchComments(mangaID) {
  const commentResults = await fetch(`${DB_URL}/${mangaID}`)
  if(!commentResults.ok) {
    return 0
  }
  const comment = await commentResults.json();
  return comment

}

export const getPopularManga = async () => {
    const mangaCollection = []
    var pageData = await fetchPopularPage()
    mangaCollection.push(pageData.Page.media)
    return mangaCollection;
}

export const searchManga = async (userQuery) => {
  var searchData = await fetchSearchQuery(userQuery)
  return searchData
}

export const getTrailer = async (mangaID) => {
  var trailerInfo = await fetchTrailer(mangaID)
  return trailerInfo.trailer
}

export const userComments = async(mangaID, comment) => {
  await postComments(mangaID, comment);
}

export const getComments = async (mangaID) => {
  const comment = await fetchComments(mangaID);
  if (comment === 0) {
    return "No Comments found"
  }
  console.log(comment);
  return comment.comment.userComment;
}
