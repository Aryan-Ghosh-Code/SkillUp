import React, { useState, useEffect } from "react";
import axios from "axios";
import './Options.css'
import logo from '../Assets/logo_skillup.png'
import './MentorSkillSwap.css'

const Options = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    mentor: "",
  });

  const [mentors, setMentors] = useState([]);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch list of mentors (users with mentor role)
    axios.get("http://localhost:5000/api/mentors").then((res) => {
      setMentors(res.data);
    }).catch((err) => {
      console.error("Failed to fetch mentors", err);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) return alert("Please upload a course video");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (form.mentor) formData.append("mentor", form.mentor);
    formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:5000/api/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Course created successfully!");
      setForm({ title: "", description: "", price: "", category: "", mentor: "" });
      setVideo(null);
      setThumbnail(null);
      setPreviewURL("");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="skillswap">
        <div className='navbar'> 
            <img src={logo} alt=" " className='logo'/>
            <nav className="main-navigation">
                <a href="#" className="nav-link">Back to Home</a>
            </nav> 
        </div>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
           <h2 className="para-text">Create a New Course..!!</h2>
        </div>
        <div className='create-course-container'>
          <form onSubmit={handleSubmit} className="create-course-form">
           <input
             type="text"
             name="title"
             placeholder="Enter Course Title"
             value={form.title}
             onChange={handleChange}
             required
             className="w-full p-2 border rounded"
          />

           <textarea
            name="description"
            placeholder="Write a Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={4}
           />

           <input
            type="number"
            name="price"
            placeholder="Enter the Price (₹)"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
           />

           <input
            type="text"
            name="category"
            placeholder="Enter course Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
           />

           <select
            name="mentor"
            value={form.mentor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
           >
            <option value="">Select Mentor (optional)</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name || mentor.email}
              </option>
            ))}
           </select>

           <div>
            <label className="block mb-1 font-medium">Upload Video *</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="w-full"
            />
           </div>

           <div>
            <label className="block mb-1 font-medium">Upload Thumbnail(optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full"
            />
           </div>

           {previewURL && (
           <img
            src={previewURL}
            alt="Thumbnail Preview"
            className="thumbnail-preview"
           />
           )}

           <button
            type="submit"
            disabled={uploading}
            className="submit-button"
           >
           {uploading ? "Uploading..." : "Create the Course"}
           </button>
          </form>
        </div>
    </div>
  );
};

export default Options;
