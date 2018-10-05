const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyCdFVpDO9GimVD_HbZ5wvxEFQIK-FAOHB0',
    q: `${searchTerm} in:name`
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
<ul>
  <li>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_Blank"><img src="${result.snippet.thumbnails.default.url}" /></a><br />
    <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_Blank">More From<br>This Channel</a>  
  </li>
</ul>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
