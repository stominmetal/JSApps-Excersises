function attachEvents() {
    const appId = 'kid_ByJwPuVfx';
    const apiBaseUrl = `https://baas.kinvey.com/appdata/${appId}/`;
    const userName = 'peter';
    const password = 'p';
    const authorization = {Authorization: 'Basic ' + btoa(`${userName}:${password}`)};

    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', loadPostDetails)

    function loadPosts() {
        $.get({
            url: apiBaseUrl + 'posts',
            headers: authorization
        })
            .then(fillDropDownMenu)
            .catch(renderError);
    }

    function fillDropDownMenu(posts) {
        let menu = $('#posts');
        menu.empty();
        for (let post of posts) {
            menu.append(createOption(post.title, post._id));
        }
    }

    function loadPostDetails() {
        let post = $('#posts').val();
        let getPostDetails = $.get({
            url: apiBaseUrl + 'posts/' + post,
            headers: authorization
        });

        let getComments = $.get({
            url: apiBaseUrl + `comments/?query={"post_id":"${post}"}`,
            headers: authorization
        });

        Promise.all([getPostDetails, getComments])
            .then(function ([posts, comments]) {
                renderPost(posts);
                renderComments(comments);
            })
            .catch(renderError);
    }

    function renderPost(postData) {
        $('#post-title').text(postData.title);
        $('#post-body').text(postData.body);
    }

    function renderComments(comments) {
        let commentsList = $('#post-comments');
        commentsList.empty();
        for (let comment of comments) {
            commentsList.append(createLi(comment.text));
        }
    }

    function renderError(error) {
        let errorContainer = $('<div>')
            .text(`Error: ${error.status} (${error.statusText})`)
            .hide();
        $('body')
            .prepend(errorContainer);

        errorContainer.slideDown(function () {
            setTimeout(function () {
                errorContainer.slideUp(function () {
                    errorContainer.remove();
                });
            }, 1000);
        });
    }

    function createOption(text, value) {
        return $('<option>')
            .attr('value', value)
            .text(text);
    }

    function createLi(text) {
        return $('<li>')
            .text(text);
    }
}