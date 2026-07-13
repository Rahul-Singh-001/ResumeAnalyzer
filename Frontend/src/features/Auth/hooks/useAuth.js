import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";
export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context;


    const handleLogin=async ({loginInput,password})=>{
        setLoading(true);
        try{
            const data=await login({login:loginInput,password})
            setUser(data.user)
        }catch(err){

        }
        finally{
            setLoading(false)
        }
        
    }

    const handleRegister=async ({username,email,password})=>{
        setLoading(true)
        try{
            const data=await register({username,email,password})
            setUser(data.user) 
        }
        catch(err){

        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout=async()=>{
        setLoading(true)
        try{
            const data=await logout()
            setUser(null)
        }catch(err){

        }finally{
        setLoading(false)
        }
    }
    useEffect(()=>{
        const getAndsetUser=async()=>{
            const data=await getMe()
            setUser(data.user)
            setLoading(false)
        }
        getAndsetUser() 
    })
    return {user,loading,handleLogin,handleLogout,handleRegister}
}