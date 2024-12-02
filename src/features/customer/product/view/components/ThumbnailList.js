import React from "react";

const ThumbnailList = ({ imageURLs, currentImageIndex, onThumbnailClick }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "10px",
      overflowX: "auto",
    }}
  >
    {imageURLs.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Thumbnail ${index}`}
        onClick={() => onThumbnailClick(index)}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "4px",
          cursor: "pointer",
          border:
            index === currentImageIndex
              ? "2px solid #1890ff"
              : "2px solid transparent",
        }}
      />
    ))}
  </div>
);

export default ThumbnailList;
