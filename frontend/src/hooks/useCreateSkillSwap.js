import { useState } from "react"
import toast from "react-hot-toast";

const useCreateSkillSwap = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const createSkillSwap = async ({
        title,
        description,
        videoUrl,
        category,
        skillTags,
        creditCost
    }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/skillswap/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                },
                body: JSON.stringify({ title, description, videoUrl, category, skillTags, creditCost })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Skill Swap Session posted successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, createSkillSwap };
}

export default useCreateSkillSwap;