
var lat, lng;
var map;
var mapHospital;
var title2;

$(document).on("pagebeforeshow", "#hospital", function() {
    $.getJSON("json1.json", function(data) {

        start = data.GroupInfo.members;

        for (x = 0; x < start.length; x++) {

            $("#info" + x).append(
                "<p>First Name: " + start[x].firstName + "</p>" +
                "<p>Last Name: " + start[x].lastName + "</p>" +
                "<p>Student Login: " + start[x].studentLogin + "<p>" +
                "<p>Student Number: " + start[x].studentNum + "</p>");

        }

        title2 = "<p style='color:rgb(34,34,34)'>" + start[0].firstName + " " + start[0].lastName + "</p><p style='color:rgb(34,34,34)'>" + start[1].firstName + " " + start[1].lastName + "</p>";

    });
});


$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "XML02-generalhealthdefinitions.xml",
        dataType: "xml",
        success: parseXML
    });
});

var count1 = 0;
var count2 = 0;
var count3 = 0;

function parseXML(xml) {

    $(xml).find("term-group").each(function() {

        $("#i" + count2++ + " header h1").append(
            $(this).find("term").text()
        );

        $("#hospitalInfo").append("<li><a href='" +
            "#i" + count1++ + "'>" +
            $(this).find("term").text() + "<img src='images/" + $(this).find("icon").text() + "'class='ui-li-icon'></a></li>")


        $("#i" + count3++ + " .ui-grid-b .ui-block-b").append(

            "<p>" + $(this).find("definition").text() + "</p>" +
            "<p><a href='" + $(this).attr("reference-url") +
            "'>" + $(this).attr("reference") + "</a></p>"

        );

    });

    $("#hospitalInfo").listview("refresh");


    $(xml).find("term-group").each(function() {

        $("#i" + count3++ + " div").append(

            "<p>" + (this).find("definition").text() + "</p>" +

            "<p><a href='" + $(this).attr("reference-url") +
            "'>" + $(this).attr("reference") + "</a></p>"
        );

    });

}

$(document).on("pagebeforeshow", "#hospital", function() {
    $.getJSON("json2.json", function(data) {

        start = data.Hospital;

        $("#googleMap").click(function() {

            lat = start.lat;
            lng = start.lng;

            title = "<p style='color:rgb(34,34,34)'>" + start.name + "</p><p style='color:rgb(34,34,34)'>" + start.city + "</p>";


            mapHospital = new google.maps.LatLng(lat, lng);
            mapCampus = new google.maps.LatLng("43.469202", "-79.698603");

            mapOptions = {
                center: mapHospital,
                zoom: 9,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: mapHospital
            });

            info = new google.maps.InfoWindow({
                content: title
            });

            google.maps.event.addListener(marker, "click", function() {
                info.open(map, marker);
            });



            marker2 = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: mapCampus
            });

            info2 = new google.maps.InfoWindow({
                content: title2
            });

            google.maps.event.addListener(marker2, "click", function() {
                info2.open(map, marker2);
            });

            var latNum = parseFloat(lat);
            var lngNum = parseFloat(lng);

            var pathCoordinates = [{
                lat: latNum,
                lng: lngNum
            }, {
                lat: 43.469202,
                lng: -79.698603
            }];

            var myPath = new google.maps.Polyline({
                path: pathCoordinates,
                strokeColor: "blue",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            myPath.setMap(map);

        });

    });
});