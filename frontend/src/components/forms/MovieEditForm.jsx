import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { validateMovie } from "../../utils/FormValidation";

import Dashboard from "../../pages/Dashboard";

// movie edit form
const MovieForm = ({ match }) => {
  const { id } = match.params;

  //state for image
  const [image, setImagePreview] = useState();

  //useHistory for pages
  const history = useHistory();

  const { data, isLoading, error } = useQuery("info", async () => {
    // using axios to access the backend
    return await axios.get(`/api/movies/${id}`).then((res) => res.data);
  });

  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
  } = useForm(submitForm, validateMovie);

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  if (isLoading) return <div className="">Loading...</div>;

  if (error) return <div className="">Error Fetching data</div>;

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
      // using axios to access the backend
      const response = await axios
        .put(`/api/movies/${data._id}/update`, values)
        .then((res) => res.data);

      if (response) history.push("/dashboard/movies");
    } catch (error) {
      setErrors({ ...errors, message: error.response.data.message });
    }
  }

  return (
    <Dashboard>
      <div className="dashboard-title">
        <h2>Movies Page</h2>
      </div>

      <div className="dashboard-component">
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
                    setValues({ ...values, cinema: e.target.value });
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
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
                  value={values.release || ""}
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
      </div>
    </Dashboard>
  );
};

export default MovieForm;
