import React from 'react'
import Swal from 'sweetalert2';
import { useState} from "react";
import annaUnivLogo from "../images/anna_university_logo.svg";
import dept from "../images/clg_dept.jpeg";
import axios from "axios";

const Login = () => {

    const[data, setData] =  useState({
        email:'',
        password:''
    })

    function login(e){
        e.preventDefault();
        console.log(data);
        axios.post("http://localhost:5000/user/login", data)
        .then(res=>{
            console.log(res);
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.error,
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
            else{
            localStorage.setItem("AuthId",res.data.accessToken);
            if(localStorage.getItem("AuthId") !== "undefined"){
            window.location.href="/ViewAssets"
            }
        }
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    return (
        <div class="w-full flex flex-wrap">

        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:justify-center pt-12 md:-mb-24">
                {/* <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a> */}
                <img
                    // className="block lg:hidden h-8 w-auto"
                    className="block ws-auto mr-3"
                    src={annaUnivLogo}
                    alt="Anna university logo"
                    width={100}
                    height={100}
                  />
            </div>

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">DEPARTMENT OF MATHEMATICS</p>
                <form class="flex flex-col pt-3 md:pt-8" onSubmit={login}>
                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">Email</label>
                        <input type="email" name="email" value={data.email} onChange={(e)=> setData({...data, [e.target.name]:e.target.value})} id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input type="password" id="password" name="password" onChange={(e)=> setData({...data, [e.target.name]:e.target.value})} placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                </form>
                {/* <div class="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
                </div> */}
            </div>

        </div>

        <div class="w-1/2 shadow-2xl">
            <img class="object-cover h-screen hidden md:block" alt="Anna university" src={dept} height={200} width={800} />
        </div>
    </div>
        
    )
}
export default Login