function findLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            function(position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                document.getElementById("location").innerHTML =
                    "Latitude: " + latitude +
                    "<br>Longitude: " + longitude;

            }
        );

    } else {
        alert("Location is not supported");
    }
}
let map = L.map('map').setView([23.6, 58.5], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

let marker;

function findLocation() {

    navigator.geolocation.getCurrentPosition(
        function(position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let accuracy = position.coords.accuracy;

            document.getElementById("location").innerHTML =
                "Latitude: " + lat +
                "<br>Longitude: " + lon +
                "<br>Accuracy: " + accuracy + " meters";

            map.setView([lat, lon], 16);

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lon])
                .addTo(map)
                .bindPopup("Your Device Location")
                .openPopup();

            document.getElementById("copyBtn").style.display = "inline-block";
            document.getElementById("mapsBtn").style.display = "inline-block";

        },
        function(error) {
            alert("Please allow location access.");
        }
    );
}

function copyLocation() {
    navigator.clipboard.writeText(
        marker.getLatLng().lat + ", " + marker.getLatLng().lng
    );
    alert("Location copied!");
}

function openGoogleMaps() {
    let pos = marker.getLatLng();
    window.open(
        "https://www.google.com/maps?q=" +
        pos.lat + "," + pos.lng
    );
}
function clearLocation() {
    document.getElementById("location").innerHTML = "";

    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }

    document.getElementById("copyBtn").style.display = "none";
    document.getElementById("mapsBtn").style.display = "none";

    map.setView([23.6, 58.5], 5);
}