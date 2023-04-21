import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { BsBookmarksFill } from "react-icons/bs";
import { AiTwotoneLike } from "react-icons/ai";
import { SiBlogger } from "react-icons/si";

const Profile = () => {
  const [isMyBlog, setIsMyBlog] = useState("my-blog");

  const navigate = useNavigate();
  const { userProfile, removeUser } = useAuthStore();

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  });

  const myBlog = isMyBlog ? " border-black" : " text-gray-400 border-white";
  const liked = !isMyBlog ? " border-black" : " text-gray-400 border-white";

  return (
    <div className=" w-full h-full">
      <div className="flex  flex-col bg-gray-50">
        <div className="top-box flex gap-5 p-5 bg-gray-50 ">
          <div className="image">
            <img
              src={userProfile?.picture}
              alt="profile"
              className="rounded-full"
            />
          </div>

          <div className="info flec flex-col gap-2">
            <h3 className="text-lg uppercase font-semibold">
              {userProfile?.name}
            </h3>
            <h3 className="text-md font-semibold">{userProfile?.email}</h3>
            <span
              onClick={handleLogout}
              className="px-1 md:px-2 py-1 md:py-[6px]  text-blue-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-blue-100 hover:border-blue-100 mt-5 cursor-pointer "
            >
              Logout
            </span>
          </div>
        </div>

        <div className="p-2 pb-0 flex mx-5 gap-2 border-b">
          <button
            onClick={() => setIsMyBlog("my-blog")}
            className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in  p-1 ${
              isMyBlog === "my-blog"
                ? " border-black"
                : " text-gray-400 border-white"
            }`}
          >
            <SiBlogger /> My Blogs
          </button>
          <button
            onClick={() => setIsMyBlog("liked")}
            className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in p-1 ${
              isMyBlog === "liked"
                ? " border-black"
                : " text-gray-400 border-white"
            }`}
          >
            <AiTwotoneLike /> Liked
          </button>
          <button
            onClick={() => setIsMyBlog("saved")}
            className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in p-1 ${
              isMyBlog === "saved"
                ? " border-black"
                : " text-gray-400 border-white"
            }`}
          >
            <BsBookmarksFill /> Saved
          </button>
        </div>
      </div>
      {isMyBlog === "my-blog" && <div>my blogs</div>}
      {isMyBlog === "liked" && <div>liked blogs</div>}
      {isMyBlog === "saved" && <div>save for the future blogs</div>}
    </div>
  );
};

export default Profile;
