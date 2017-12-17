const div = document.getElementById('imgs');
const lselect = document.getElementById('limit');
const sselect = document.getElementById('sub');
// const oselect = document.getElementById('sort');

function loadImgs() {
  div.innerHTML = 'Loading...';

  let limit = `?limit=${lselect.value}`;
  let sort = $('#sort').val();

  let sub = 'disneyvacation';

  if (!sselect.value) {
    if (window.location.hash.length > 2) {
      sub = window.location.hash.replace('#', '');
    }
    sselect.value = sub;
  } else {
    sub = sselect.value.substring(0, 20);
  }

  window.location.hash = sub;
  sselect.value = sub;
  document.title = `${sub} - Simple Reddit Image Gallery - dnomaid.co.uk`;

  let apiurl = `https://www.reddit.com/r/${sub}${sort}.json${limit}`;
  console.log(`Using URL: ${apiurl}`);

  div.innerHTML = 'Sending a request to reddit...';
  apiurl
  $.getJSON(apiurl, function(response) {
    const posts = response.data.children;

    div.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i].data;

      if (post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) && post.url.indexOf('https') !== -1) {
        div.innerHTML += `<a href="javascript:doMsg('Double click to open!');" title="'${post.title}' by /u/${post.author}" ondblclick="document.location.href = 'https://reddit.com${post.permalink}'"><img src="${post.url}"></a>`;
      }
    }

    if (div.innerHTML == '' || !div.innerHTML) {
      div.innerHTML = `<h3>Whoops!</h3><h4>No images found!</h4><p>There may not be any images or gifs in /r/${sub} or the subreddit name may be spelt incorrectly.</p>`;
    }
  })
}

function doMsg(msg) {
  let before = document.getElementById('message').innerHTML;

  document.getElementById('message').innerHTML = `&#9888; ${msg}`;

  window.setTimeout(function() {
    document.getElementById('message').innerHTML = before;
  }, 2500);
}

function doTitle(msg) {
  // let before = document.getElementById('message').innerHTML;
  //
  // document.getElementById('message').innerHTML = `${msg}`;
}
