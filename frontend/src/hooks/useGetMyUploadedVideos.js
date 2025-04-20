import { useState } from "react"
import toast from "react-hot-toast";

const useGetMyUploadedVideos = () => {
    const [loading, setLoading] = useState(false);

    const getMyVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/courses/uploaded`, {
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
    return { loading, getMyVideos };
}

export default useGetMyUploadedVideos;