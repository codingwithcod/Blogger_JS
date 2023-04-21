import React, { useEffect } from "react";
import  { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import {toast} from 'react-hot-toast'
import { Toaster } from "react-hot-toast";
import {FaAward} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import {BsBookmarksFill} from 'react-icons/bs'


import useAuthStore from "../store/authStore";
import Dropdown from "../components/Dropdown";







const CreateBlog = () => {


  const [content, setContent] = useState('');
  const [formData, setFormData] = useState("");
  const [isSavedBlog, setIsSavedBlog] = useState(true)
  const [category, setCategory] = useState({category:'Select Category'});

  const {userProfile} = useAuthStore();
  const editor = useRef(null);
  const navigate = useNavigate();






  useEffect(()=>{
    if(!userProfile){
        navigate('/')
        
    }
});
  
 const handleChange = (e) => {
  setFormData({...formData, [e.target.name]:e.target.value})
} ;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {heading,  desc, fImage} = formData;
    
    if(!(category.category === 'Select Category')){
      
    
    if(heading &&  desc && fImage && content){
      
      const blog = {...formData, ...category, content, ...userProfile, isSavedBlog}

      const response  = await fetch('http://localhost:4000/api/blog', {
        method:'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({...blog})
      }) 
  
      if(response.ok){
       const data = await response.json()
        toast.success(data.message)
        setIsSavedBlog(true)
        setContent('')
        setFormData('')
        setCategory({category:'Select Category'})
      }

    }else{
      toast.error('all field Required !!')
    }

  }else{
    toast.error('Please Select Category !!')
  }
    
   
  };
  


  return (
    <div className=" h-[90vh] overflow-y-auto homeScrollTrack mx-auto flex flex-col">
    <Toaster/>
      
      <div className="m-5 flex flex-col gap-5  items-center">

        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center  " >
        {/* =========================== */}
        <div className="flex justify-evenly w-full">
            <div className="flex m-2 gap-4 flex-col text-lg font-semibold">
              <span>Category<span className="text-red-500">*</span></span>
              <span>Heading<span className="text-red-500">*</span></span>
              <span>Featured Image<span className="text-red-500">*</span></span>
              <span>Description<span className="text-red-500">*</span></span>
              
            </div>
            <div className="flex m-2 gap-3 flex-col w-[90%] sm:w-[60%]">

            <Dropdown category={category} setCategory={setCategory} />

           
             
             <input
            type="text"
            autoComplete="off"
            name="heading"
            onChange={handleChange}
            value={formData.heading || ""}
            className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
          />
             <input
            type="text"
            autoComplete="off"
            name="fImage"
            onChange={handleChange}
            value={formData.fImage || ""}
            placeholder='https://www.example.com/image/234234'
            className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
          />
             <textarea
            type="text"
            autoComplete="off"
            name="desc"
            rows={3}
            onChange={handleChange}
            value={formData.desc || ""}
            className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
          />
              
            </div>
          </div>

        {/* =========================== */}
          <div className=" md:m-1  p-2   rounded-3xl w-[100%] sm:w-[85%]">
          <h3 className="pb-1 text-gray-500">Write A Full Flaged Blog<span className="text-red-500">*</span></h3>
              <JoditEditor
                ref={editor}
                value={content}
                name="htmlCode"              
                onChange={newContent => setContent(newContent)}
              />
        </div>
        <div className="flex justify-evenly w-[50%]">
          <button
          onClick={() => {setIsSavedBlog(false); handleSubmit} }
          className="px-3 py-1 bg-indigo-500 outline-none text-white rounded-md mr-5 flex gap-2 items-center"
          >
          Publish <FaAward/>
          </button>
          <button
          className="px-3 py-1 bg-indigo-500 outline-none text-white rounded-md mr-5 flex gap-2 items-center"
          type="submit"
          > 
          Save <BsBookmarksFill className="text-sm"/>
          </button>
        </div>
        </form>
      </div>
    
        
    </div>
  );
};

export default CreateBlog;
 