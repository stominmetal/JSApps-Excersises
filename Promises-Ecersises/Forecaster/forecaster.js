function attachEvents() {
    $("#submit").on('click', function () {
        let location = $("#location").val();
        let current = $("#current");
        let upcoming = $("#upcoming");

        let conditionSymbols = {
            "Rain": "☀",
            "Partly sunny": "⛅",
            "Overcast": "☁",
            "Sunny": "☂",
            "Degrees": "°"
        }

        $.get("https://judgetests.firebaseio.com/locations.json")
            .then(renderWeather)
            .catch(renderError);

        function renderWeather(data) {
            let code = null;
            for (let obj of data) {
                if (obj.name == location) {
                    code = obj.code;
                }
            }

            $.get("https://judgetests.firebaseio.com/forecast/today/" + code + ".json")
                .then(renderDataForOneDay)

            $.get("https://judgetests.firebaseio.com/forecast/upcoming/" + code + ".json")
                .then(renderDataForThreeDays)
        }

        function renderDataForOneDay(data) {
            $("#forecast").css("display", "unset");
            let spanConditionSymbol = $("<span>").html(conditionSymbols[data.forecast.condition]);
            spanConditionSymbol.addClass("condition symbol");
            current.append(spanConditionSymbol);
            let span = $("<span>")
                .append(
                    $("<span>")
                        .text(data.name)
                        .addClass("forecast-data")
                )
                .append(
                    $("<span>")
                        .text(data.forecast.low + "°/" + data.forecast.high + "°")
                        .addClass("forecast-data")
                )
                .append(
                    $("<span>")
                        .text(data.forecast.condition)
                        .addClass("forecast-data")
                )
                .addClass("condition");
            current.append(span);
        }

        function renderDataForThreeDays(data) {
            let forecast = data.forecast;
            for (let obj of forecast) {
                let span = $("<span class='upcoming'>")
                    .append(
                        $("<span>")
                            .html(conditionSymbols[obj.condition])
                            .addClass("symbol")
                    )
                    .append(
                        $("<span>")
                            .text(obj.low + "°/" + obj.high + "°")
                            .addClass("forecast-data")
                    )

                    .append(
                        $("<span>")
                            .text(obj.condition)
                            .addClass("forecast-data")
                    )
                upcoming.append(span)
            }
        }

        function renderError() {
            console.log("Error")
        }
    });
}