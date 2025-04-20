import { useState } from "react"
import toast from "react-hot-toast";

const useGetMentorCourses = () => {
    const [loading, setLoading] = useState(false);

    const getMentorCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/courses/get-courses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                return data;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getMentorCourses };
}

export default useGetMentorCourses;