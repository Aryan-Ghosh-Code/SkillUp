import { useState } from "react"
import toast from "react-hot-toast";

const useGetMySkillSwapSessions = () => {
    const [loading, setLoading] = useState(false);

    const getMySkillSwap = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/skillswap/enrolled`, {
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
    return { loading, getMySkillSwap };
}

export default useGetMySkillSwapSessions;