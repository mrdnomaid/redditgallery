const div = document.getElementById('imgs');
const lselect = document.getElementById('limit');
const sselect = document.getElementById('sub');
// const oselect = document.getElementById('sort');


function loadImgs() {
  div.innerHTML = 'Loading...';

  let limit = `?limit=${lselect.value}`;
  let sub = sselect.value.substring(0, 20);
  let sort = $('#sort').val();

  if (!sub) {
    let sub = 'disneyvacation';
    sselect.value = sub;
  }

  if (window.location.hash) {
    sub = window.location.hash.replace('#', '');
    sselect.value = sub;
    document.title = `${sub} - Simple Reddit Image Gallery - dnomaid.co.uk`;
  } else {
    window.location.hash = sub;
  }

  let apiurl = `https://www.reddit.com/r/${sub}${sort}.json${limit}`;
  console.log(`Using URL: ${apiurl}`);

  div.innerHTML = 'Sending a request to reddit...';
  apiurl
  $.getJSON(apiurl, function(response) {
    const posts = response.data.children;

    div.innerHTML = '';

    console.log(posts.length);
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i].data;

      if (post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/)) {
        div.innerHTML += `<a href="javascript:doMsg('Double click to open!');" title="'${post.title}' by /u/${post.author}" ondblclick="document.location.href = 'https://reddit.com${post.permalink}'"><img src="${post.url}"></a>`;
      }
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
