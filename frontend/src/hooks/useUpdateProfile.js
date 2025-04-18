import { useState } from "react"
import toast from "react-hot-toast";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const updateProfile = async ({
        age,
        about,
        image,
        skills
    }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/users/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                },
                body: JSON.stringify({ age, about, image, skills })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data.profile) {
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, updateProfile };
}

export default useUpdateProfile;