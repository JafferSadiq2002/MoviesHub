import { useState } from "react";
import { Link } from "react-router-dom";
import profileLogo from "../assets/profileLogo.png";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
const navLinks = [
  {
    id: 1,
    icon: <MdHomeFilled />,
    text: "Home",
    path: "/",
  },
  {
    id: 2,
    icon: <MdOutlineFavorite />,
    text: "Favorites",
    path: "/favorites",
  },
  {
    id: 3,
    icon: <FaSearch />,
    text: "Explore",
    path: "/explore",
  },
];
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(navLinks[0].id);
  const onSelectNavLinks = (id) => {
    setShowMenu(false);
    setIsActive(id);
  };
  return (
    <>
      <div
        className="show-case flex justify-end w-full h-full fixed duration-500 z-1000"
        style={{
          visibility: showMenu ? "visible" : "hidden",
          opacity: showMenu ? 1 : 0,
        }}
        onClick={() => {
          setShowMenu(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-full w-[40%]  bg-white absolute duration-[400ms] p-8"
          style={{
            left: showMenu ? "0%" : "-100%",
          }}
        >
          <nav className="flex flex-col  gap-5 ">
            {navLinks.map((eachLink) => {
              return (
                <li
                  className={`text-black list-none hover:text-lg hover:duration-200 hover:border-b-3  hover:border-amber-700 transition ${
                    isActive === eachLink.id
                      ? "text-lg border-b-3 border-amber-700"
                      : ""
                  } `}
                  key={eachLink.id}
                  id={eachLink.id}
                  onClick={() => onSelectNavLinks(eachLink.id)}
                >
                  <Link
                    to={eachLink.path}
                    className="text-lg flex items-center gap-2"
                  >
                    {eachLink.icon}
                    {eachLink.text}
                  </Link>
                </li>
              );
            })}
          </nav>
        </div>
      </div>
      <header className="p-[10px] bg-gray-900/90 backdrop-blur-lg shadow-lg h-[20%] ">
        <div className="flex items-center  max-w-[1200px] mx-auto">
          <Link to="/">
            <h1 className="text-2xl text-red-500 font-bold tracking-tighter">
              MOVIESHUB
            </h1>
          </Link>
          <GiHamburgerMenu
            className=" ml-auto text-white md:hidden"
            onClick={() => setShowMenu(true)}
            size={30}
          />
          <div className="ml-auto hidden md:flex">
            <nav className="flex items-center gap-5 ">
              {navLinks.map((eachLink) => {
                return (
                  <li
                    className={`text-white hover:text-amber-700 list-none  hover:duration-500 hover:border-b-3 hover:scale-105 hover:border-amber-700 transition `}
                    style={{
                      transition: "all 0.3s",
                      cursor: "pointer",
                      isActive:
                        isActive === eachLink.id
                          ? "text-lg border-b-3 border-amber-700"
                          : "",
                    }}
                    key={eachLink.id}
                    id={eachLink.id}
                    onClick={() => onSelectNavLinks(eachLink.id)}
                  >
                    <Link
                      to={eachLink.path}
                      className="text-md flex items-center gap-2"
                    >
                      {eachLink.icon}
                      {eachLink.text}
                    </Link>
                  </li>
                );
              })}
            </nav>
          </div>
          <div className="h-[60px] w-[70px] flex justify-center items-center  md:ml-0">
            <img
              src={profileLogo}
              className="w-[60px] hover:w-[50px] hover:duration-500 "
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
