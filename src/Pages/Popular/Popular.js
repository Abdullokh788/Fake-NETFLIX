import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Context } from "../../Context/Context";
function Popular() {
  const env = process.env.REACT_APP_API;
  const apiKey = process.env.API_KEY;
  const { data, setData } = useContext(Context);
  const [movieData, setMovieData] = useState({
    isFetched: false,
    data: [],
  });

  useEffect(() => {
    axios
      .get(env + `/movie/popular`, {
        params: {
          api_key: "0431834c535ecb8b718ac720e46307f3",
          page: 1,
        },
      })
      .then((res) => {
        setMovieData({
          isFetched: true,
          data: res.data.results,
        });
        setData(res.data.results);
      })
      .catch((err) => {
        setMovieData({
          isFetched: false,
          data: [],
        });
      });
  }, []);
  window.localStorage.setItem("movideData", JSON.stringify(data));
  return (
    <div className="flex justify-between flex-wrap px-5 mt-5">
      {movieData.isFetched && movieData.data.map((item) => <MovieCard key={item.id} obj={item} />)}
    </div>
  );
}

export default Popular;
