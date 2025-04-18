import { useState } from "react"
import toast from "react-hot-toast";

const useGetProfile = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const profile = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/users/profile`, {
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
    return { loading, profile };
}

export default useGetProfile;