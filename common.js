function hideHeader() {
  $('header div#meta').slideToggle();
  $('span#a-u').toggle();
  $('span#a-d').toggle();
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


// https://stackoverflow.com/a/6274381
function s(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}
