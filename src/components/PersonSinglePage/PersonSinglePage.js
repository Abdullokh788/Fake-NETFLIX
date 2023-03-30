import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Arrow from "../../Assets/Images/arrow.svg"
function PersonSinglePage() {
  const { id } = useParams();
  const personSingle = JSON.parse(window.localStorage.getItem("person-single")).find(
    (item) => item.id === id - 0
  );
  const navigate = useNavigate()
  return (
    <div>
      <img onClick={() => navigate(-1)} className="absolute cursor-pointer" src={Arrow} width={30} height={30} alt="Back" />
      <img
        className="mx-auto"
        src={"https://image.tmdb.org/t/p/w500/" + personSingle.profile_path}
        width={500}
        height={200}
        alt="Person Single Img"
      />
    </div>
  );
}

export default PersonSinglePage;
