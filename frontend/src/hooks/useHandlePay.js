import { useState } from "react"
import toast from "react-hot-toast";

const useHandlePay = () => {
    const [payLoading, setPayLoading] = useState(false);

    const handlePay = async (courseId) => {
        const body = {
            courseId
        }

        setPayLoading(true);
        try {
            const res = await fetch(`/api/payments/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPayLoading(false);
        }
    }

    return { payLoading, handlePay }
}

export default useHandlePay;