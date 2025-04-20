import { useState } from "react"
import toast from "react-hot-toast";

const useGetSkillSwapSessions = () => {
    const [loading, setLoading] = useState(false);

    const getSkillSwap = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/skillswap/sessions`, {
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
    return { loading, getSkillSwap };
}

export default useGetSkillSwapSessions;