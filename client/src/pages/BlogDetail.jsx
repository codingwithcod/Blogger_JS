import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import FollowIcon from "../assets/follow.svg";
import FollowedIcon from "../assets/followed.svg";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isFollowed, setisFollowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(`http://localhost:4000/api/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success == false) {
        navigate("/");
      } else {
        setBlog(data.data);
      }
    };

    blogData();
  }, []);

  return (
    <div className="main_container flex">
      <div className="contain w-full md:w-[70%] h-[90vh] overflow-y-auto scrollHide pl-10 mt-2 p-5 ">
        <div className=" flex flex-col    gap-5   h-auto   ">
          <div className="w-[100%] sm:w-[60%] md:w-[100%] ">
            <div className="user-profile flex items-center gap-2">
              <img
                src={blog?.picture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
              <span className="text-md font-bold text-gray-600">
                {blog?.name}
              </span>
              <span className="text-gray-400 text-xs">
                {moment(blog?.updatedAt).fromNow()}
              </span>
            </div>
            <div className="p-2">
              <h2 className="text-[3rem] text-slate-900  tracking-tight font-bold leading-tight">
                {blog?.heading}
              </h2>
              <p className="text-xl text-gray-500 mt-4">{blog?.desc}</p>
            </div>
          </div>
        </div>
        {/* ----------------------------- */}
        <div className="flex justify-center h-[400px] mt-5 ">
          <img src={blog?.fImage} className="object-cover" alt="fImage" />
        </div>
        <div></div>

        <div className="htmlCode mt-4 mb-5 ">
          <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
        </div>
      </div>

      {/* ============================================================= */}
      <div className="profile w-[30%] hidden md:block border-l px-5 ">
        <div className="bg-white flex flex-col mt-5 justify-center items-center">
          <div className=" ">
            <img
              src={blog?.picture}
              className="rounded-full mb-2"
              alt="profile"
            />
          </div>
          <span className="text-2xl font-medium">{blog?.name}</span>
          <span className="text-md text-gray-400 font-medium">
            @{blog?.email?.split("@")[0]}
          </span>
          <span className="text-sm text-gray-400 ">322 Followers</span>

          <div className="mt-3 ">
            {isFollowed ? (
              <button
                onClick={() => setisFollowed((prev) => !prev)}
                className="px-1 md:px-3 py-1 md:py-[6px]  text-blue-500 border border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-100 hover:border-blue-100 "
              >
                <span>Follow</span>
                <img
                  src={FollowIcon}
                  width={20}
                  className="text-blue-500"
                  alt=""
                />
              </button>
            ) : (
              <button
                onClick={() => setisFollowed((prev) => !prev)}
                className="px-1 md:px-3 py-1 md:py-[6px]  bg-blue-500 border text-[#f5f5f5] border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-500 hover:border-blue-600 "
              >
                <span>Followed</span>
                <img src={FollowedIcon} width={20} alt="" />
              </button>
            )}
          </div>
        </div>
        <div className="border-b mt-5 px-5"></div>
        <span className="mt-2 font-bold">
          other from <span className="text-blue-500 text-lg">{blog?.name}</span>
        </span>
        <div>name</div>
        <div>name</div>
        <div>name</div>
      </div>
    </div>
  );
};

export default BlogDetail;
