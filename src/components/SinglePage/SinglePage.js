import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Arrow from "../../Assets/Images/arrow.svg";
function SinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const env = process.env.REACT_APP_API;
  const singleMovieData = JSON.parse(window.localStorage.getItem("movideData")).find(
    (item) => item.id === id - 0
  );
  const [personData, setPersonData] = useState(
    JSON.parse(window.localStorage.getItem("person-single")) || []
  );
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    axios
      .get(env + `/movie/${id}/credits`, {
        params: {
          api_key: "0431834c535ecb8b718ac720e46307f3",
        },
      })
      .then((res) => {
        setPersonData(res.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(env + `/movie/${id}/videos`, {
        params: {
          api_key: "0431834c535ecb8b718ac720e46307f3",
        },
      })
      .then((res) => {
        setVideoData(res.data.results.splice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  window.localStorage.setItem("person-single", JSON.stringify(personData));
  return (
    <div className="flex justify-between">
      <img
        onClick={() => navigate(-1)}
        className="absolute cursor-pointer"
        src={Arrow}
        width={30}
        height={30}
        alt="Arrow "
      />
      <ul className="w-[30%]">
        <h2 className="text-center font-bold text-[20px]">Actors</h2>
        {personData.length > 0 &&
          personData.splice(0, 3).map((item) => (
            <Link key={item.id} to={`/single-page/${id}/person/${item.id}`}>
              <img
                className="mx-auto mb-5"
                src={"https://image.tmdb.org/t/p/w500/" + item.profile_path}
                width={"60%"}
                height={80}
                alt="Person Img"
              />
            </Link>
          ))}
      </ul>
      <ul className="w-[40%]">
        <img
          key={singleMovieData.id}
          className="h-[100vh]"
          src={"https://image.tmdb.org/t/p/w500/" + singleMovieData.poster_path}
          width={"100%"}
          height="100vh"
          alt="Img"
        />
      </ul>
      <ul className="w-[30%]">
        <h2 className="text-center font-bold text-[20px]">Videos</h2>
        {videoData.length > 0 &&
          videoData.map((item) => (
            <iframe
              key={item.id}
              className="rounded-md"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
      </ul>
    </div>
  );
}

export default SinglePage;
