import { useState, useRef, useEffect } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon,MenuIcon, XIcon, UserIcon, SunIcon, MoonIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound, theme, toggleTheme } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [ismenuopen,setIsmenuOpen]=useState(false);
  // console.log(authUser)

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (authUser?.profilePic) {
      setSelectedImg(authUser.profilePic);
    }
  }, [authUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50 transition-all duration-300">
      
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className={` ${theme==="dark" ? "text-slate-200" : "text-gray-800" } font-bold text-base max-w-[180px] truncate`}>
              {authUser?.fullName || "Loading..."}
            </h3>
            <p className={`${theme==="dark" ? "text-slate-200" : "text-gray-800" } text-xs`}>Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="hidden sm:flex gap-4 items-center">
          <button
                className={`${theme==="dark"? "text-slate-200" : " text-slate-800"} hover:text-yellow-300 transition-colors flex items-center gap- w-full`}
                onClick={() => {
                   toggleTheme();}}>
                {theme==="dark" ? (
                  <SunIcon className="size-5 cursor-pointer" />
                ) : (
                  <MoonIcon className="size-5 cursor-pointer" />
                )}
              </button>
          {/* LOGOUT BTN */}
          <button
            className={`${theme==="dark"? "text-slate-200" : " text-slate-800"} hover:text-red-700 transition-colors`}
            onClick={logout}
          >
            <LogOutIcon className="size-5 cursor-pointer" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className={`${theme==="dark"? "text-slate-200" : " text-slate-800"} hover:text-green-700 transition-colors`}
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) =>
                console.log("Audio play failed:", error)
              );
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5 cursor-pointer" />
            ) : (
              <VolumeOffIcon className="size-5 cursor-pointer" />
            )}
          </button>
        </div>


          {/* For Mobile */}
        <div className="flex sm:hidden  size-full justify-end">
            <button className={` ${theme==="dark" ? "dark_theme" : "light_theme"} transition-colors`} onClick={()=>setIsmenuOpen((prev)=> !prev)}>
              <MenuIcon className="size-6"/> 
            </button>
        </div>

        <div className={`menuDiv absolute z-20 top-0 left-0 ${theme==="dark"? " bg-slate-900 text-slate-400  border-slate-500": "bg-gray-100 text-black border-black"} w-full h-[80%] p-5 rounded-t-lg transition-all duration-500 shadow-2xl
          ${ismenuopen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}`}>
            <button  className="w-full h-fit flex justify-end">
              <XIcon onClick={()=>setIsmenuOpen((prev)=> !prev)} className="size-6" />
            </button>
            <div className="flex flex-col gap-7 mt-4 items-start">
              <h1 className="flex gap-3 border-b pb-1 w-full"><UserIcon/> Update Profile</h1>
              <button
                className="flex items-center gap-2 transition-colors border-b pb-1 w-full"
                onClick={() => {
                  mouseClickSound.currentTime = 0;
                  mouseClickSound.play().catch((error) =>
                    console.log("Audio play failed:", error)
                  );
                  toggleSound();
                }}
              >
                {isSoundEnabled ? (
                  <Volume2Icon className="size-6 cursor-pointer" />
                ) : (
                  <VolumeOffIcon className="size-6 cursor-pointer" />
                )}

                <span >
                  {isSoundEnabled ? "Disable Sound" : "Enable Sound"}
                </span>
              </button>
              <button
                className="flex items-center gap-2 transition-colors border-b pb-1 w-full"
                onClick={() => {
                   toggleTheme();}}>
                {theme==="dark" ? (
                  <SunIcon className="size-6 cursor-pointer" />
                ) : (
                  <MoonIcon className="size-6 cursor-pointer" />
                )}

                <span >
                  {theme==="dark" ? "Enable Light Mode" : "Enable Dark Mode"}
                </span>
              </button>
              <h1 className="flex gap-3 text-red-700 border-b border-red-700 pb-1 w-full" onClick={logout}><LogOutIcon/> Logout</h1>
              <div className={`${theme==="dark" ? "bg-gray-800 text-gray-500" : "bg-gray-400/60"}   w-full rounded-lg h-fit p-4 shadow-xl transition-all duration-300`}>
                <h1 className={`border-b pb-2 ${theme=="dark" ? "border-slate-400" : "border-b-black"} `}>Your Profile</h1>
                <div className={`h-[150px] w-full pt-3 `}>
                  <h1 className="flex gap-4">Name: <span className="font-bold text-xl"> {authUser.fullName}</span></h1>
                  <h1 className="flex gap-4">Id: <span className="font-bold text-md">{authUser.email}</span></h1>
                  <h1 className="flex gap-4">Last Updated at: <span className="font-bold text-md">{new Date(authUser.updatedAt).toLocaleDateString()}</span></h1>
                  

                </div>

              </div>
            </div>
        </div>



       





      </div>

    </div>
  );
}

export default ProfileHeader;
