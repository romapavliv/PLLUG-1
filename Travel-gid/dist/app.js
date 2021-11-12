//Elements UI
const place = document.querySelector(".request-form__select-place");
const placeIcon = document.querySelector(".request-form__icon-place");
const distances = document.querySelector(".request-form__all-distances");
const typeOfResponse = document.querySelector(
  ".request-form__typeResponse-all"
);
const btnSubmit = document.querySelector(".request-form__submit");

//Usefull variables
let currentDistance = 0.5;
let currentPlace = "restaurant";
let currentResponse = "csv";

let currentLat, currentLong;
navigator.geolocation.getCurrentPosition(function (position) {
  currentLat = position.coords.latitude;
  currentLong = position.coords.longitude;
});

//Events
place.addEventListener("change", onChangePlaceHandler);
distances.addEventListener("click", onClickDistancesHandler);
typeOfResponse.addEventListener("click", onClickResponsesHandler);
btnSubmit.addEventListener("click", onClickSubmitHandler);

// Custom Http Module
function customHttp() {
  return {
    async get(type, url) {
      try {
        const response = await fetch(url);
        if (type == "json") {
          return response.json();
        } else if (type == "text") {
          return response.text();
        }
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    async post(type, url, data = {}, newHeaders = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (newHeaders != {}) {
        Object.entries(newHeaders).forEach(([key, value]) => {
          response.headers = [key, value];
        });
      }
      if (type == "json") {
        return response.json();
      } else if (type == "text") {
        return response.text();
      }
    },
    async put(type, url, newHeaders = {}, data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (newHeaders != {}) {
        Object.entries(newHeaders).forEach(([key, value]) => {
          response.headers = [key, value];
        });
      }
      if (type == "json") {
        return response.json();
      } else if (type == "text") {
        return response.text();
      }
    },
    async delete(type, url, newHeaders = {}) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (newHeaders != {}) {
        Object.entries(newHeaders).forEach(([key, value]) => {
          response.headers = [key, value];
        });
      }
      if (type == "json") {
        return response.json();
      } else if (type == "text") {
        return response.text();
      }
    },
  };
}
// Init http module
const http = customHttp();

//Events function
function onChangePlaceHandler(e) {
  switch (this.value) {
    case "Restaurant":
      placeIcon.innerHTML = '<i class="fas fa-utensils"></i>';
      currentPlace = "restaurant";
      break;
    case "Museum":
      placeIcon.innerHTML = '<i class="fas fa-landmark"></i>';
      currentPlace = "museum";
      break;
    case "Hotel":
      placeIcon.innerHTML = '<i class="fas fa-hotel"></i>';
      currentPlace = "hotel";
      break;
    case "Cafe":
      placeIcon.innerHTML = '<i class="fas fa-coffee"></i>';
      currentPlace = "coffee";
      break;
    case "McDonald’s":
      placeIcon.innerHTML = '<i class="fas fa-hamburger"></i>';
      currentPlace = "McDonalds";
      break;
  }
}

function onClickDistancesHandler(e) {
  if (e.target.value) {
    currentDistance = Number(e.target.value);
  }
}

function onClickResponsesHandler(e) {
  if (e.target.value) {
    currentResponse = e.target.value;
  }
}

function onClickSubmitHandler(e) {
  e.preventDefault();

  let responseObj = {
    query: currentPlace,
    radius: currentDistance * 1000,
    lat: currentLat,
    lng: currentLong,
  };
  if (currentResponse == "csv") {
    http
      .post("text", "http://198.199.125.240:8888/csv", responseObj)
      .then((data) => downloadFile(data));
  } else {
    http
      .post("json", "http://198.199.125.240:8888/search", responseObj)
      .then((data) => init(data));
  }
}

//Help functions
function downloadFile(urlData) {
  var aLink = document.createElement("a");
  aLink.href = "data:text/plain;charset=UTF-8," + urlData;
  aLink.download = "data.csv";
  aLink.click();
}

function init(data) {
  let mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(currentLat, currentLong),
    styles: [
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }, { hue: "#ff0000" }],
      },
    ],
  };

  let mapElement = document.querySelector(".myMap");
  let myMap = new google.maps.Map(mapElement, mapOptions);
  mapElement.classList.add("d-block");

  let myPosition = new google.maps.Marker({
    position: new google.maps.LatLng(currentLat, currentLong),
    map: myMap,
    icon: 'images/myposition.png',
    label: {
      text: 'YOU',
      color: 'white'
    }
  });

  data.forEach((newMarker) => {
    let newMarkerPosition = addMarker(myMap, newMarker["lat"], newMarker["lng"]);
    let newMarkerDesq = createInfo(newMarker['name']);
    addDesq(newMarkerDesq, myMap, newMarkerPosition);
  })
}

function addMarker(map, myLat, myLng, icon) {
  return new google.maps.Marker({
    position: new google.maps.LatLng(myLat, myLng),
    map: map
  });
}

function createInfo(text) {
  return new google.maps.InfoWindow({
    content: `<h1>${text}</h1>`,
  });
}

function addDesq(infoWindow, map, marker) {
  return marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}
