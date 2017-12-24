const div = document.getElementById('imgs');
const lselect = document.getElementById('limit');
const sselect = document.getElementById('sub');
// const oselect = document.getElementById('sort');

function loadImgs(append) {
    doMsg('Loading');

    let limit = `?limit=${lselect.value}`;
    let sort = $('#sort').val();
    let nsfw = $('#nsfw').val();
    let shuffle = $('#shuffle').val();
    let self = $('#self').val();
    let selfc = $('#selfc').val();

    let subs = ['disneyvacation', 'aww', 'eyebleach', 'marijuanaenthusiasts', 'pics', 'britpics'];
    let sub = subs[Math.floor(Math.random() * subs.length)];

    if (!sselect.value) {
        if (window.location.hash.length > 2) {
            sub = window.location.hash.replace('#', '');
        }
        sselect.value = sub;
    } else {
        sub = sselect.value.substring(0, 50);
    }

    if (!append) {
        append = '';
    }

    window.location.hash = sub;
    sselect.value = sub;
    document.title = `${sub} - Simple Reddit Image Gallery - dnomaid.co.uk`;

    let apiurl = `https://www.reddit.com/r/${sub}${sort}.json${limit}${append}`;
    console.log(`Using URL: ${apiurl}`);

    doMsg('Sending a request to reddit');

    $.getJSON(apiurl, function(response) {
        window.r = response;

        let posts = response.data.children;
        if (!append) {
            div.innerHTML = '';
        }

        doMsg('Sorting posts');
        if (shuffle == 'y') {
            s(posts);
        }

        for (let i = 0; i < posts.length; i++) {
            let post = posts[i].data;

            if (nsfw == 'n' && post.over_18 == true) {
                // do nothing, this post is nsfw and the user has nsfw posts turned off
            } else if (post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) && post.url.indexOf('https') !== -1) {
                div.innerHTML += `<a href="javascript:doMsg('Double click to open!',false,true);" title="'${post.title}' by /u/${post.author}" ondblclick="document.location.href = 'https://reddit.com${post.permalink}'"><img src="${post.url}"></a>`;
            } else if (self == 'y' && post.is_self == true) {
                let tlen = post.title.length;
                let scontent = '';
                if (selfc == 'y') {
                    scontent = `<p>${post.selftext.replace('\n', '<br>')}</p>`;
                    tlen = tlen + scontent.length;
                }
                let tsize = 10;
                if (tlen > 100) {
                    tsize = 0.8;
                } else if (tlen > 50) {
                    tsize = 1;
                } else if (tlen > 25) {
                    tsize = 1.5;
                } else {
                    tsize = 2;
                }
                div.innerHTML += `<div style="font-size: ${tsize}em; border: 1px solid #cee3f8; padding: 4px;"><a href="javascript:doMsg('Double click to open!',false,true);" title="'${post.title}' by /u/${post.author}" ondblclick="document.location.href = 'https://reddit.com${post.permalink}'"><h3>${post.title}</h3>${scontent}</a></div>`;
            }
        }

        doMsg('', false, false);

        if (div.innerHTML == '' || !div.innerHTML) {
            doMsg('Nothing found!', true);
        }
    });
}

$(window).scroll(function() {
    if (window.r.data.after) {
        // console.log(window.r);
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
            loadImgs(`&after=${window.r.data.after}`);
            window.r = undefined;
        }
    }
});
