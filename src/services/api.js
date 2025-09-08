var BASE_URL = "https://graphql.anilist.co"


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
        month
        day
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



function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(JSON.stringify(data,null,2));
}

function handleError(error) {
    console.error(error);
}