import { useState } from "react"
import toast from "react-hot-toast";

const useJoinSkillSwapSessions = () => {
    const [loading, setLoading] = useState(false);

    const enroll = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/skillswap/enroll/${id}`, {
                method: "POST",
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
                toast.success("Enrolled in the session successfully");
                return data;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, enroll };
}

export default useJoinSkillSwapSessions;