let attachEvents = () => {
    const url = 'https://messenger-40767.firebaseio.com/messenger';
    let messagesArea = $('#messages');

    $('#refresh').on('click', function () {
        getMessages();
    });

    $('#submit').on('click', function () {
        addNewMessage();
    });

    function addNewMessage() {
        let author = $('#author').val().trim();
        let content = $('#content').val().trim();
        if (author != '' && content != '') {
            let time = Date.now();
            $.ajax({
                method: 'POST',
                data: JSON.stringify({
                    author,
                    content,
                    time
                }),
                url: url + '.json',
                success: function () {
                    $('#content').val('');
                    getMessages();
                }
            });
        }
    }

    function getMessages() {
        $.ajax({
            method: 'GET',
            url: url + '.json',
            success: renderMessages
        })
    }

    function renderMessages(messages) {
        messagesArea.val('');
        let sortedMessages = [...Object.keys(messages)]
            .sort((a, b) => messages[a].time - messages[b].time)
            .map(msg => messages[msg]);

        for (let msg of sortedMessages) {
            messagesArea.val(messagesArea.val() + `${msg.author}: ${msg.content}\n`);
            messagesArea.text(messagesArea.text() + `${msg.author}: ${msg.content}\n`);
        }
    }
}
