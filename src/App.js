import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const apiKey = "d12447f70e875413282a48b9cbe48257";
  const apiUrl = "https://api.flickr.com/services/rest?";
  const searchImages = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a valid search term.");
      return;
    }

    try {
      const url = `${apiUrl}api_key=${apiKey}&method=flickr.photos.search&tags=${searchTerm}&format=json&nojsoncallback=1`;
      const response = await axios.get(url);
      const photos = response.data.photos.photo;

      if (photos && photos.length > 0) {
        setImages(photos);
      } else {
        alert("No images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching images.");
    }
  };

  return (
    <div className="App">
      <span id="head"><h2>Flickr-Img</h2></span>
      <div id="search-id">
        <input
          type="text"
          placeholder="Search For Images:"
          required
          id="in"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchImages()}
        />
        
      </div>

      <div className="container">
        <div className="row">
          {images.map((photo) => {
            const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
            return (
              <div className="col-mb-3" key={photo.id}>
                <img src={imgUrl} alt={photo.title || "Flickr Image"} className="img-fluid" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
