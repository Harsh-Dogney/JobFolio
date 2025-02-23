import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button.jsx";
import { LogOut, User2 } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store.js";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { setUser } from "@/redux/authSlice.js";
import { toast } from "sonner";
import { motion } from "framer-motion";

const NavBar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
  }
  return (

    <div className="bg-[#16423C]">
      {" "}
      {/* Adding side margins */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 py-9">
        <div>
          <Link to="/" className="text-4xl font-bold text-[#FFFFFF] hover:text-[#D4F1F4] transition-transform duration-300">
            Job<span className="text-[#F0EDE5]">Folio</span>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role == 'recruiter' ? (
                <>
                  <li className="text-[#FFFFFF] text-lg hover:text-[#D4F1F4] transition-transform duration-300 hover:scale-110"><Link to="/admin/companies"> Companies</Link></li>
                  <li className="text-[#FFFFFF] text-lg hover:text-[#D4F1F4] transition-transform duration-300 hover:scale-110"><Link to="/admin/jobs"> Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className="text-[#FFFFFF] text-lg hover:text-[#D4F1F4] transition-transform duration-300 hover:scale-110"><Link to="/"> Home</Link></li>
                  <li className="text-[#FFFFFF] text-lg hover:text-[#D4F1F4] transition-transform duration-300 hover:scale-110"><Link to="/jobs"> Jobs</Link></li>
                  <li className="text-[#FFFFFF] text-lg hover:text-[#D4F1F4] transition-transform duration-300 hover:scale-110"><Link to="/browse"> Browse</Link></li>
                </>
              )
            }
          </ul>
          {
            !user ? (
              <div className="flex gap-2 items-center">
                <Link to="/login"><Button className='transition-transform duration-300 hover:scale-110' variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#2A2A2A] hover:bg-[#505050] transition-transform duration-300 hover:scale-110">Signup</Button></Link>
              </div>
            ) : (
              <Popover >
                <PopoverTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer transition-transform duration-300 hover:scale-110 ">
                    <AvatarImage className="rounded-full"
                      src={user?.profile?.profilePhoto} alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <motion.div
                  initial={{ opacity: 1, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PopoverContent
                    className=" w-64 bg-[#F0EDE5] rounded shadow-lg m-2">
                    <div className="flex gap-8 space-y-2  ">
                      <Avatar className=" w-10 h-10 cursor-pointer">
                        <AvatarImage className="m-4 rounded-full transition-transform duration-300 hover:scale-110 "
                          src={user?.profile?.profilePhoto} alt="@shadcn"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg ">{user?.fullname}</h4>
                        <p className="text-sm font-medium text-gray-950 text-muted-foreground ">{user?.profile.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-col text-gray-800 my-2 mx-4">
                      {
                        user && user.role == 'student' && (

                          <div className="flex w-fit items-center gap-2 cursor-pointer ">
                            <User2 />
                            <Button variant="link" className='hover:no-underline transition-transform duration-300 hover:scale-110'><Link to="/profile">View Profile</Link></Button>
                          </div>
                        )
                      }
                      <div className="flex w-fit items-center gap-4 my-2 cursor-pointer ">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link" className='transition-transform duration-300 hover:scale-110 hover:no-underline'>LogOut</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </motion.div>
              </Popover>
            )
          }
        </div>
      </div>
    </div >
  );
};

export default NavBar;
