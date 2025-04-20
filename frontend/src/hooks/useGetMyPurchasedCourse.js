import { useState } from "react"
import toast from "react-hot-toast";

const useGetMyPurchasedCourse = () => {
    const [loading, setLoading] = useState(false);

    const getMyCourse = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/courses/enrolled`, {
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
    return { loading, getMyCourse };
}

export default useGetMyPurchasedCourse;