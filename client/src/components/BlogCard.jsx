import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import saveIcon from "../assets/save.svg";
import saveFillIcon from "../assets/saveFill.svg";
import likeIcon from "../assets/like.svg";
import likeFillIcon from "../assets/likeFill.svg";
import useAuthStore from "../store/authStore";

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { heading, fImage, desc, name, picture, createdAt, _id, likes } = blog;
  const { userProfile } = useAuthStore();

  useEffect(() => {
    if (userProfile) {
      const userId = likes.find((like) => like == userProfile.sub);
      if (userId) {
        setIsLiked(true);
      }
    }
  }, [isLiked, userProfile]);

  const likeBlog = async () => {
    if (!userProfile) {
      toast.error("Please sign in first !!");
    }
    const response = await fetch(
      `http://localhost:4000/api/like/${_id}?userId=${userProfile.sub}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    // <Link to={`/blog/${_id}`}>
    <div
      // to={`/blog/${_id}`}
      className=" flex  justify-center items-center flex-row gap-1 sm:gap-5  border-b border-gray-300 m-2 md:m-5 h-auto    "
    >
      <div className="w-[100%] sm:w-[60%] md:w-[80%]  ">
        <div className="user-profile flex items-center gap-2">
          <img
            src={picture}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <span className="text-md font-bold">{name}</span>
        </div>
        <div className="p-2 z-50 ">
          <Link to={`/blog/${_id}`}>
            <h2 className="text-lg md:text-2xl  font-semibold tracking-wide">
              {heading}
            </h2>
            <p className="sm:hidden">{desc.slice(0, 60)}...</p>
            <p className="hidden sm:block">{desc.slice(0, 300)}...</p>
          </Link>
          <div className="icons flex gap-3 mt-2">
            <span className="text-gray-400 text-xs">
              {moment(createdAt).fromNow()}
            </span>

            <img
              onClick={() => (setIsLiked((prev) => !prev), likeBlog())}
              src={isLiked ? likeFillIcon : likeIcon}
              width={25}
              alt=""
              className="cursor-pointer"
            />

            <img
              onClick={() => setIsSaved((prev) => !prev)}
              src={isSaved ? saveFillIcon : saveIcon}
              width={25}
              alt=""
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/* ======================= */}
      <div className="w-[40%] h-[30%]  md:w-[15%] md:h-[60%]  flex justify-center item-center ">
        <img src={fImage} className="object-cover" alt="fImage" />
      </div>
    </div>
    // </Link>
  );
};

export default BlogCard;
