// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => {
//     return useContext(AuthContext);
// }

// export const AuthContextProvider = ({ children }) => {
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("SU-user") || null));

//     return <AuthContext.Provider value={{ authUser, setAuthUser }}>
//         {children}
//     </AuthContext.Provider>
// }

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("SU-user");
        if (storedUser) {
            try {
                setAuthUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse SU-user from localStorage", e);
                localStorage.removeItem("SU-user");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
