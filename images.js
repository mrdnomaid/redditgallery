const div = document.getElementById('imgs');
const lselect = document.getElementById('limit');
const sselect = document.getElementById('sub');
// const oselect = document.getElementById('sort');

function loadImgs() {
  doMsg('Loading');

  let limit = `?limit=${lselect.value}`;
  let sort = $('#sort').val();

  let subs = ['disneyvacation', 'aww', 'eyebleach', 'marijuanaenthusiasts'];
  let sub = subs[Math.floor(Math.random() * subs.length)];

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

  doMsg('Sending a request to reddit');

  $.getJSON(apiurl, function(response) {
    const posts = response.data.children;

    div.innerHTML = '';

    doMsg('Sorting posts');

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i].data;

      if (post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) && post.url.indexOf('https') !== -1) {
        div.innerHTML += `<a href="javascript:doMsg('Double click to open!',false,true);" title="'${post.title}' by /u/${post.author}" ondblclick="document.location.href = 'https://reddit.com${post.permalink}'"><img src="${post.url}"></a>`;
      }
    }

    doMsg('', false, false);

    if (div.innerHTML == '' || !div.innerHTML) {
      doMsg('No images found!', true);
    }
  })
}

function doMsg(msg, warn, time) {
  let before = document.getElementById('message').innerHTML;

  if (warn) {
    warn = '&#9888; ';
  } else {
    warn = '';
  }

  document.getElementById('message').innerHTML = `${warn}${msg}`;

  if (time) {
    window.setTimeout(function() {
      document.getElementById('message').innerHTML = before;
    }, 2500);
  }
}

function doTitle(msg) {
  // let before = document.getElementById('message').innerHTML;
  //
  // document.getElementById('message').innerHTML = `${msg}`;
}
