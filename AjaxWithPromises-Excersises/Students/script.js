function solve() {
    const appId = "kid_BJXTsSi-e";
    const username = 'guest';
    const password = 'guest';
    const base64Auth = btoa(`${username}:${password}`);
    const authorizationHeader = {Authorization: `Basic ${base64Auth}`};
    const apiUrl = `https://baas.kinvey.com/appdata/${appId}/students`;
    const table = $('#results');

    $.ajax({
        method: "GET",
        url: apiUrl,
        headers: authorizationHeader
    })
        .then(renderStudents)
        .error(renderError);

    function renderStudents(data) {
        for (let obj of data) {
            let tr = $("<tr>");
            tr.append(
                $("<td>").text(obj.ID)
            ).append(
                $("<td>").text(obj.FirstName)
            ).append(
                $("<td>").text(obj.LastName)
            ).append(
                $("<td>").text(obj.FacultyNumber)
            ).append(
                $("<td>").text(obj.Grade)
            );
            table.append(tr)
        }
    }

    function renderError() {
        table.append("<tr>Error</tr>")
    }
}