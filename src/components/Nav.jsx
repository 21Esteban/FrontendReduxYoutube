import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../fakeData.js/Data";
import {
  getVideos,
  handleClose,
  handleShow,
  saveVideo,
  setfilterVideos,
  setIsEdit,
  updateVideo,
} from "../redux/appSlice";

const formularioInitialState = {
  title: "",
  views: "",
  date: new Date(),
  videoId: "",
  linkImg: "",
  category: "",
  channelName: "",
  channelLinkImg: "",
};

export const Nav = () => {
  const dispatch = useDispatch();

  const { videos, isEdit, videoToEdit, show } = useSelector(
    (state) => state.appStore
  );

  const [formulario, setFormulario] = useState(formularioInitialState);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => { 
    dispatch(getVideos())
    isEdit
      ? setFormulario({ ...videoToEdit, date: new Date(videoToEdit.date) })
      : setFormulario(formularioInitialState);
  }, [isEdit]);

  const searchVideos = () => {
    dispatch(
      setfilterVideos(
        videos.filter((video) =>
          video.title.toLowerCase().includes(inputSearch.toLowerCase())
        )
      )
    );
  };

  const closeModal = () => {
    dispatch(handleClose());
    dispatch(setIsEdit(false));
    resetState();
  };

  const resetState = () => {
    setFormulario(formularioInitialState);
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit?dispatch(updateVideo(formulario)):dispatch(saveVideo(formulario));
    
    closeModal();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flew-wrap align-items-center  p-1">
        {/* logo de youtube */}
        <div className="col d-flex align-items-center col-md-auto d-none d-md-flex me-4">
          <div>
            <svg
              style={{ height: 24, flexShrink: 0 }}
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <span>
                <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
              </span>
            </svg>
          </div>
          <img
            src="/images/youtube.png"
            width={120}
            className="ms-2"
            alt="img"
          />
        </div>

        <div className=" col-10 col-md-6 col-lg-6">
          <div
            className="input-group flex-nowrap col-10"
            style={{ width: "90%" }}
          >
            {/* input de search */}
            <input
              type="text"
              className="form-control rounded-4"
              placeholder="Search"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />

            {/* icono de lupa */}
            <button
              className="input-group-text px-3 rounded-4"
              onClick={() => searchVideos()}
            >
              <svg
                style={{ height: 24, flexShrink: 0 }}
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="col d-flex align-items-center col-md-auto">
          <div className="dropdown">
            <button
              className="btn  dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                style={{ height: 24, flexShrink: 0 }}
              >
                <g>
                  <path d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z"></path>
                </g>
              </svg>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => dispatch(handleShow())}
                >
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style={{ height: 24, flexShrink: 0 }}
                  >
                    <g>
                      <path d="M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z"></path>
                    </g>
                  </svg>
                  Subir Video
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal show={show} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={actions}>
            <Form.Group className="mb-3">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                name="title"
                value={formulario.title}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video views</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                name="views"
                value={formulario.views}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video date</Form.Label>
              <DatePicker
                selected={formulario.date}
                onChange={(date) => setFormulario({ ...formulario, date })}
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>VideoId</Form.Label>
              <Form.Control
                className="form-control"
                required
                name="videoId"
                value={formulario.videoId}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video linkImg</Form.Label>
              <Form.Control
                className="form-control"
                required
                name="linkImg"
                value={formulario.linkImg}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Channel name</Form.Label>
              <Form.Control
                className="form-control"
                required
                name="channelName"
                value={formulario.channelName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Channel linkImg</Form.Label>
              <Form.Control
                className="form-control"
                required
                name="channelLinkImg"
                value={formulario.channelLinkImg}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              value={formulario.category}
              name="category"
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">Open this select menu</option>
              {/* elimino la opcion All Categories de las opciones, esto lo hago primero filtrando el array categories y el resultado de ese filtro se recorre con el map */}
              {categories
                .filter((category) => category !== "All Categories")
                .map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
            </Form.Select>

            <div className="mt-4 d-flex justify-content-between">
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
