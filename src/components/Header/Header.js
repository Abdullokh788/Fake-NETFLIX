import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png";
import { Context } from "../../Context/Context";
function Header() {
  const navigate = useNavigate()
  const env = process.env.REACT_APP_API;
  const [letSearchList, setSearchList] = useState(false)
  const [searchData, setSearchData] = useState([])
  const searchRef = useRef()
  const { data, setData } = useContext(Context);
  const handleChangeInput = (evt) => {
    if (evt.target.value === "") {
      setSearchList(false)
    }
    else {
      setSearchList(true)
      axios
        .get(env + `/search/movie?query=` + evt.target.value, {
          params: {
            api_key: "0431834c535ecb8b718ac720e46307f3",
          },
        })
        .then((res) => {
          setSearchData(res.data.results);
          setData(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleSearchClick = (evt) => {
    searchRef.current.value = evt.target.textContent
    setSearchList(false)
    navigate(`/single-page/${evt.target.id}`)
  }
  window.localStorage.setItem("movideData", JSON.stringify(data));
  return (
    <header className="py-3 bg-slate-400">
      <div className="w-[1220px] mx-auto flex items-center justify-between">
        <img src={Logo} width={70} height={70} alt="Logo" />
        <div className="flex items-center space-x-10">
          <nav className="flex items-center space-x-5">
            <NavLink
              className={"text-white font-semibold text-[18px] hover:text-blue-300"}
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={"text-white font-semibold text-[18px] hover:text-blue-300"}
              to={"/popular"}
            >
              Popular
            </NavLink>
            <NavLink
              className={"text-white font-semibold text-[18px] hover:text-blue-300"}
              to={"/top-rated"}
            >
              Top Rated
            </NavLink>
          </nav>
          <div className="relative">
            <input
              onBlur={() => setTimeout(() => setSearchList(false), [150])}
              ref={searchRef}
              onChange={handleChangeInput}
              className="border-2 border-slate-400 pl-2 py-1.5 rounded-md outline-none focus:border-blue-400"
              placeholder="searching..."
            />
            {letSearchList && <ul className="absolute w-[150%] right-0 bg-white shadow-lg h-[400px] overflow-auto">
              {searchData.length > 0 && searchData.map(item => (
                <li key={item.id} onClick={handleSearchClick} id={item.id} className="cursor-pointer py-1 pl-3 hover:bg-blue-400 hover:text-white">{item.title}</li>
              ))}
            </ul>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
