import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { validateMovie } from "../../utils/FormValidation";

//movie create form 
const MovieForm = () => {
  const [image, setImagePreview] = useState();

   // useHistory of pages
  const history = useHistory();

  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
  } = useForm(submitForm, validateMovie);

  // file handling
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  // submit function of the form
  async function submitForm(values) {
    try {
      // upload photo

      // using axios to access the backend
      const imageURL = await axios
        .post("/api/movies/upload", { image })
        .then((res) => res.data);

      values.imageURL = imageURL.url;

      // using axios to access the backend
      await axios.post("/api/movies/create", values).then((res) => res.data);

      history.push("/dashboard");
    } catch (error) {
      setErrors({ ...errors, message: error.response.data.message });
    }
  }

  return (
    <div className="admin-form">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="form-input"
            value={values.title || ""}
          />
          {errors.title && <pre>{errors.title}</pre>}
        </div>
        <div className="form-field">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="form-input"
            value={values.description || ""}
          />
          {errors.description && <pre>{errors.description}</pre>}
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Director</label>
            <input
              type="text"
              name="director"
              onChange={handleChange}
              value={values.director || ""}
              className="form-input"
            />
            {errors.director && <pre>{errors.director}</pre>}
          </div>
          <div className="form-field">
            <label className="form-label">Casts</label>
            <input
              type="text"
              name="casts"
              value={values.casts || ""}
              onChange={handleChange}
              className="form-input"
            />
            {errors.casts && <pre>{errors.casts}</pre>}
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Price</label>
            <input
              type="text"
              name="price"
              onChange={(e) => {
                setValues({ ...values, price: Number(e.target.value) });
              }}
              value={values.price || ""}
              className="form-input"
            />
            {errors.price && <pre>{errors.price}</pre>}
          </div>
          <div className="form-field">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              className="form-input"
              value={values.category || ""}
            />
            {errors.category && <pre>{errors.category}</pre>}
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Cinema</label>
            <select
              name="cinema"
              onChange={(e) => {
                setValues({ ...values, cinema: Number(e.target.value) });
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {errors.cinema && <pre>{errors.cinema}</pre>}
          </div>
          <div className="form-field">
            <label className="form-label">Movie Duration</label>
            <input
              type="text"
              name="movieDuration"
              onChange={handleChange}
              className="form-input"
              value={values.movieDuration || ""}
            />
            {errors.movieDuration && <pre>{errors.movieDuration}</pre>}
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Release Date</label>
            <input
              type="date"
              name="release"
              onChange={handleChange}
              className="form-input"
            />
            {errors.release && <pre>{errors.release}</pre>}
          </div>
          <div className="form-field">
            <label className="form-label">Show Duration</label>
            <select
              name="showDuration"
              onChange={(e) => {
                setValues({ ...values, showDuration: e.target.value });
              }}
            >
              <option value={7}>1 week</option>
              <option value={14}>2 weeks</option>
              <option value={21}>3 weeks</option>
              <option value={30}>1 month</option>
            </select>
            {errors.showDuration && <pre>{errors.showDuration}</pre>}
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Image:</label>
            <input
              type="file"
              name="imageURL"
              accept="image/*"
              onChange={fileHandler}
            />
          </div>
          <img src={values.imageURL || image} alt="cover" height="200px" />
          {errors.imageURL && <pre>{errors.imageURL}</pre>}
        </div>
        <div className="form-field">
          <button className="primary createBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
