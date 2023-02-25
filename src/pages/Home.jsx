import React, { useState } from "react";
import moment from "moment/moment";

import ModalVideo from "react-modal-video";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideo, handleShow, setIsEdit, setvideoToEdit } from "../redux/appSlice";

export const Home = () => {
  const dispatch = useDispatch();


  const { filterVideos } = useSelector((state) => state.appStore);

  const [isOpen, setOpen] = useState(false);
  const [idVideoModal, setIdVideoModal] = useState("");

  const openYoutubeModal = (videoId) => {
    setIdVideoModal(videoId);
    setOpen(true);
  };

  const closeYoutubeModal = () => {
    setIdVideoModal("");
    setOpen(false);
  };

  const clickUpdate = (video) => {
    dispatch(setIsEdit(true));
    dispatch(handleShow());
    dispatch(setvideoToEdit(video));
  };

  return (
    <div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={idVideoModal}
        onClose={() => closeYoutubeModal()}
      />

      <div className="container-fluid p-5 py-3">
        <div className="row" style={{ marginTop: 60 }}>
          {filterVideos.map((video) => (
            <div
              className="col-12 col-md-6 col-lg-4 col-xl-3 animate__animated animate__pulse"
              key={video._id}
            >
              <div className="card card-video border-0 bg-transparent mb-4">
                <img
                  alt="img"
                  src={video.linkImg}
                  className="img-fluid"
                  style={{ cursor: "pointer" }}
                  onClick={() => openYoutubeModal(video.videoId)}
                />
                <div className="card-video-details d-flex mt-2">
                  <div className="me-2">
                    <img alt="img" src={video.channelLinkImg} width={40} />
                  </div>
                  <div>
                    <h4>{video.title}</h4>
                    <div>{video.channelName}</div>
                    <div>
                      {video.views} views •{" "}
                      {moment(video.date, "YYYY-MM-DD")
                        .startOf("day")
                        .fromNow()}
                    </div>
                    <div>
                      <button
                        className="btn"
                        onClick={() => clickUpdate(video)}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          dispatch(deleteVideo(video._id))
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
