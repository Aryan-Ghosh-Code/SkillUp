import { useState } from "react";
import toast from "react-hot-toast";

const useCreateCourses = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const createCourse = async ({
        title,
        description,
        price,
        mentorId,
        videoUrl,
        category
    }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/courses/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    mentor: mentorId,
                    videoUrl,
                    category
                }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Course created successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createCourse };
};

export default useCreateCourses;
