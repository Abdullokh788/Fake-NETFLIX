import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ obj }) {
  const { title, poster_path, overview, release_date, id } = obj;
  return (
    <>
      <Link
        id={id}
        to={`/single-page/${id}`}
        className="w-[300px] cursor-pointer mb-5 p-2 flex flex-col space-y-3 rounded-md bg-blue-400 text-white "
      >
        <img
          src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          width={"100%"}
          height="70"
          alt="Card Img"
        />
        <h2>{title}</h2>
        <p className="whitespace-nowrap text-ellipsis overflow-hidden">{overview}</p>
        <p>{release_date}</p>
        <butto className="bg-green-500 text-white p-2 rounded-md hover:opacity-50">More</butto>
      </Link>

    </>
  );
}

export default MovieCard;
