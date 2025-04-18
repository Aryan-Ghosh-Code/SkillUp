import toast from "react-hot-toast";

export const uploadVideoToCloudinary = async (videoFile) => {
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dn3looclj/video/upload";
  const uploadPreset = "SkillUp";

  try {
    // Create a FormData object to send the file to Cloudinary
    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);
    
    // If videoFile is already a File or Blob object, use it directly
    if (videoFile instanceof File || videoFile instanceof Blob) {
      formData.append("file", videoFile);
    } else {
      // If it's a URL (blob URL or string), this is likely the issue
      // Cloudinary expects a file, not a URL
      throw new Error("Invalid file format. Please provide a File object.");
    }
    
    // Make the request to Cloudinary
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    // Parse the response
    const data = await res.json();
    
    if (!res.ok) {
      console.error("Cloudinary Error:", data);
      throw new Error(`Cloudinary upload failed: ${data.error?.message || res.statusText}`);
    }

    // Return the secure URL of the uploaded video
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading video:", error);
    toast.error(error.message || "Couldn't upload video");
    throw error; // Re-throw to allow caller to handle
  }
};