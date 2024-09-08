"use client";
import { useRef, useState } from "react";
import classes from "./css/image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const imageInput = useRef();
  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file: ", file);

    if (!file) {
      setImagePreview(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImagePreview(fileReader?.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor="iamge">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imagePreview ? (
            <p> No Image picked yet</p>
          ) : (
            <Image src={imagePreview} alt="Image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="iamge/png , image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          onClick={handlePickClick}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
