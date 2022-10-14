import "../css/map.css";
import axios from "axios";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 200 | any;
};

// declare var google: any;
const GKEY = "AIzaSyCY5yC4zm15dKouSxHYlhvhs_qYqvyyUuk";
const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=${GKEY}`;

class GMap {
  $hostElement: HTMLDivElement;
  $target: HTMLDivElement;
  constructor(hostId: string = "app") {
    this.$hostElement = document.getElementById(hostId)! as HTMLDivElement;
    this.$target = document.createElement("div");
    this.$hostElement.appendChild(this.$target);
    this.render();
    this.configure();
  }
  configure() {
    const form = document.getElementById("map_form")!;
    const adressInput = document.getElementById("address")! as HTMLInputElement;
    async function searchAdressHandler(e: Event) {
      // console.log(searchAdressHandler);
      e.preventDefault();
      const adressValue = adressInput.value;
      try {
        const res = await axios.get<GoogleGeocodingResponse>(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            adressValue,
          )}&key=${GKEY}`,
        );
        if (res.status !== 200) new Error("google api error");
        const coordinates = res.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map")!, {
          center: coordinates,
          zoom: 15,
        });
        new google.maps.Marker({
          map,
          // icon: image,
          // title: place.name,
          position: coordinates,
        });
      } catch (error) {
        console.log(error);
      }
      // send api
    }
    form.addEventListener("submit", searchAdressHandler);
  }

  render() {
    this.$target.innerHTML = `
      <div id="map">
        <p>주소를 입력해주세요!</p>
      </div>
      <form id="map_form">
        <input type="text" name="" id="address" />
        <button type="submit">검색</button>
      </form>
    `;
  }
}

const map = () => {
  new GMap();
};
export default map;
