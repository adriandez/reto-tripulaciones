import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import axios from "axios";
import MarkerImg from "../../img/marker.png";
import "./Home.scss";

const Home = () => {
  const [wc, setWc] = useState([]);
  const searchWc = async (e) => {
    e.preventDefault();

    let wc = e.target.wc.value;

    let obj = {
      name: wc,
    };
    let resultWc = await axios.post("/api/search", obj);

    console.log(resultWc.data);

    setWc(resultWc.data);
  };

  const [viewport, setViewport] = useState({
    width: "80vw",
    height: "40vh",
    latitude: 40.4205026,
    longitude: -3.7254743,
    zoom: 10,
  });
  console.log(wc);

  const mapeo = () => {};
  /* 
  const popUp = () =>{


    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
      );

      return popup
  } */

  const openPopup = (index) => {
    document.getElementById("resultado").innerHTML = `


<p><h2>${wc[index].name} </h2></p>
<p><img src="https://www.seekpng.com/png/detail/199-1996608_star-rating-3-5-stars.png"></p>
<p>Ahorarr dolore eiusmod apetecan la caidita ...</p>
<p><img src=${wc[index].img}/> </p>



`;
  };

  return (
    <div>
      <form onSubmit={searchWc}>
        <label>Buscar WC</label>
        <input type="text" name="wc" />
        <button>BUSCAR</button>
      </form>
      <section className="Home">
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {wc.map((item, i) => (
            <Marker
              key={i}
              latitude={item.latitude}
              longitude={item.longitude}
              offsetLeft={-20}
              offsetTop={-30}
            >
              <div className="marker" onClick={() => openPopup(item.id)}>
                {/*     <span><b>{i + 1}</b></span> */}
              </div>
            </Marker>
          ))}

 
        </ReactMapGL>
      </section>

      <div id="resultado" className="popUp">
 
      </div>
    </div>
  );
};

export default Home;
