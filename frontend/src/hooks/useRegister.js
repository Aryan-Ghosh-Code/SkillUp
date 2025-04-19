// import { useState } from "react"
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const useRegister = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();
//     const navigate = useNavigate();
//     const apiUrl = import.meta.env.VITE_API_URL;

//     const register = async ({
//         name,
//         email,
//         role,
//         password,
//     }) => {

//         const success = handleInputErrors({ name, email, role, password });
//         if (!success) return;

//         console.log({ name, email, role, password })
//         setLoading(true);
//         try {
//             const res = await fetch(`${apiUrl}/auth/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
//                 },
//                 body: JSON.stringify({ name, email, role, password })
//             });

//             const data = await res.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }

//             localStorage.setItem("SU-token", data.token);
//             localStorage.setItem("SU-user", JSON.stringify(data.user));
//             setAuthUser(data);

//             if (data) {
//                 toast.success("Signed up successfully");
//                 let user = {};
//                 user = localStorage.getItem("SU-user");
//                 if (user.role === "SkillSwapper") {
//                     navigate("/skillSwap");
//                 } else {
//                     navigate("/mentor-skill-swap");
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//     return { loading, register };
// }

// export default useRegister;


// //Validators
// function handleInputErrors({ name, email, role, password }) {
//     if (!name || !email || !role || !password) {
//         toast.error("Please fill all the fields");
//         return false;
//     }

//     if (password.length < 6) {
//         toast.error("Password should be atleast 6 characters long");
//         return false;
//     }

//     if (role !== "SkillSwapper" && role !== "Mentor") {
//         toast.error("Enter a valid Role");
//         return false;
//     }

//     if (!isGmailFormat(email)) {
//         toast.error('Please enter a valid Gmail address.');
//         return false;
//     }

//     if (!isPasswordStrong(password)) {
//         toast.error('Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.');
//         return false;
//     }

//     return true; //success
// }

// const isGmailFormat = (email) => {
//     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     return gmailRegex.test(email);
// };

// const isPasswordStrong = (password) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
// }

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const register = async ({ name, email, role, password }) => {
        const success = handleInputErrors({ name, email, role, password });
        if (!success) return;

        console.log({ name, email, role, password });
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SU-token")}`,
                },
                body: JSON.stringify({ name, email, role, password }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("SU-token", data.token);
            localStorage.setItem("SU-user", JSON.stringify(data.user));
            setAuthUser(data.user); // ✅ Match useLogin logic

            toast.success("Signed up successfully");

            const user = data.user; // ✅ Directly use data.user
            if (user.role === "SkillSwapper") {
                navigate("/skillSwap");
            } else {
                navigate("/mentor-skill-swap");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

export default useRegister;

// ✅ Validators
function handleInputErrors({ name, email, role, password }) {
    if (!name || !email || !role || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be at least 6 characters long");
        return false;
    }

    if (role !== "SkillSwapper" && role !== "Mentor") {
        toast.error("Enter a valid Role");
        return false;
    }

    if (!isGmailFormat(email)) {
        toast.error("Please enter a valid Gmail address.");
        return false;
    }

    if (!isPasswordStrong(password)) {
        toast.error(
            "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
        );
        return false;
    }

    return true;
}

const isGmailFormat = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
};

const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
