import React from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const FlickrImage = ({ imgUrl, title }) => {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = title || "flickr_image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="col-mb-3">
      <img src={imgUrl} alt={title || "Flickr Image"} className="img-fluid" />
      <div className="text-center mt-2">
        <Button variant="primary" onClick={downloadImage}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default FlickrImage;
