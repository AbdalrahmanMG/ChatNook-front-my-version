/* eslint-disable react/prop-types */
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { editProfile } from "../api/auth";
import { storage } from '../firebase/Firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'

console.log('Profile rerender !!!!! 🚧');



export default function UserProfile({ userData, className, getUserProfile, getAllGroupsHandler, getAllUsersHandler }) {
  console.log("🎈🎈🎈🎆", userData);
  //let { setUserToken } = useContext(userContext);
  let [editprofile, setEditProfile] = useState(false)
  let [loading, setLoading] = useState(false)
  let [fName, setfName] = useState('')
  let [pPic, setpPic] = useState('')
  let [preImage, setPreImage] = useState(userData.profilePic)
  let [uploadPic, setUploadPic] = useState(userData.profilePic || null)
  const navigate = useNavigate();

  console.log("data user image =>>>", userData);

  const changeToEdit = () => {
    editprofile = !editprofile
    setEditProfile(editprofile)
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  let validationSchema = yup.object({
    fullName: yup.string().max(25).required(),
    // email: yup.string().required() // add later when verify by real mail
    profilePic: yup.mixed()
  })

  let onSubmit = async (values) => {
    console.log(values);
    setLoading(true)
    try {
      if (userData.profilePic != uploadPic) {
        const profilePicRef = ref(storage, `profilePic/${uploadPic.name + v4()}`)

        await uploadBytes(profilePicRef, uploadPic).then(() => {
          toast.success("Profile image uploaded!")
        }).catch((err) => {
          console.log(err);
          toast.error("Faild to upload profile Image")
        })
        values.profilePic = await getDownloadURL(profilePicRef)
        setUploadPic(values.profilePic)
      }

      const response = await editProfile(values)

      console.log(response);
      if (response.status == 200) {
        changeToEdit()
        userData.profilePic = response.data.profilePic
        userData.fullName = response.data.fullName
        setfName(response.data.fullName)
        setpPic(response.data.profilePic)
        localStorage.setItem("user", JSON.stringify(userData))
        toast.success("User profile updated!")
        getAllUsersHandler()
        getAllGroupsHandler()
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error("Faild to update user profile!")
      setLoading(false)
    }
  }


  let formiK = useFormik({
    initialValues: {
      fullName: userData.fullName,
      // email:'',
      profilePic: userData.profilePic,
    }, validationSchema,
    onSubmit
  })

  const handelPicChange = (event) => {
    setUploadPic(event.target.files[0])
    let selectedImag = event.target.files[0]
    formiK.setFieldValue('profilePic', event.currentTarget.files[0])
    console.log(selectedImag);
    setPreImage(URL.createObjectURL(selectedImag))
  }



  useEffect(() => {
    let userId = localStorage.getItem("id")
    console.log("userId", userId);
    if (userData.participants) {
      userData.participants.map((p) => {
        if (p._id == userId) {
          console.log("p._id", p._id);
          console.log(fName, pPic);
          return { ...p, fullName: fName, profilePic: pPic }
        } else return p
      })
    }
  }, [userData, fName, pPic])

  return (
    <div
      className={` border border-[#1e77872c] h-screen flex flex-col justify-between text-gray-600 ${className}`}
    >
      <div className="h-screen relative">
        {/* showen image and name */}
        <div className="flex flex-col items-center ">
          <div className="avatar online mt-8 mb-2">
            <div className="w-24 rounded-full">
              <img src={userData.chatPic ? userData.chatPic : preImage} />
            </div>
          </div>
          <h1 className="font-semibold text-base capitalize my-2 px-3 text-gray-600">
            {userData.chatName ? userData.chatName : userData.fullName}
          </h1>

        </div>
        {/* horizotal line */}
        <div className="flex justify-center">
          <div className=" h-0.5  hr w-80 my-4"></div>
        </div>
        {/* personal data sign */}
        <div className="flex justify-center my-8">
          <input
            className=" w-3/4 h-10 rounded-lg bg-gray-200 text-gray-500  text-center text-lg"
            disabled={true}
            value="Personal Data"
          ></input>
        </div>


        {/* edit user data */}

        {!editprofile ?
          // user data (name, email, particicipant)
          <div div className="flex h-3/6  flex-col mx-6">
            <h1 className="text-slate-400 capitalize  text-base py-2">Name</h1>
            <p >
              {userData.chatName ? userData.chatName : userData.fullName}
            </p>

            {userData.isGroup ?
              <>
                <p className="md:hidden absolute top-8 left-8 cursor-pointer border rounded-md px-3 py-1 hover:bg-slate-400 transition hover:text-white" onClick={getUserProfile}>back</p>

                <div className=" h-full overflow-y-hidden">
                  <h1 className="text-slate-400 capitalize  text-base py-2">Users in Chat</h1>
                  {userData.participants.map((p) => {
                    return (
                      <div className="flex gap-2 my-1 items-center">
                        <img src={p.profilePic} className="w-8 h-8 rounded-full" alt={p.fullName} />
                        <p key={p._id}>
                          {p.fullName}
                        </p>
                      </div>
                    )
                  })}

                </div>
              </>
              :
              <></>}

            {userData.token ?
              <>
                <h1 className="text-slate-400 capitalize  text-base py-2">Email</h1>
                <p >{userData.email}</p>
                <button className="btn btn-info my-4" onClick={changeToEdit}>Edit Profile</button>
              </>
              :
              <></>
            }
          </div>
          :
          // edit user data
          <form onSubmit={formiK.handleSubmit}>
            <div className="flex h-3/6  flex-col mx-6">
              <label htmlFor="userName" className="text-slate-400 capitalize  text-base py-2">Name</label>
              <input type="text"
                id="userName"
                onBlur={formiK.handleBlur}
                onChange={formiK.handleChange}
                value={formiK.values.fullName}
                name="fullName"
                className="vlock w-5/6 border border-gray-300 rounded-md"
              />
              {formiK.errors.fullName && formiK.touched.fullName ?
                <p className="text-red-700">{formiK.errors.fullName}</p> : null}

              {/* <h1 className="text-slate-400 capitalize  text-base py-2">Email</h1>
            <p >{userData?.email}</p> */}

              <label htmlFor="profilePic" className="text-slate-400 capitalize  text-base py-2">Name</label>
              <input type="file"
                id="profilePic"
                onBlur={formiK.handleBlur}
                onChange={handelPicChange}
                name="profilePic"
                className="vlock w-5/6 border border-gray-300 rounded-md"
              />
              {formiK.errors.profilePic && formiK.touched.profilePic ?
                <p className="text-red-700">{formiK.errors.profilePic}</p> : null}

              <button type="submit"
                className="btn btn-info my-4">Update Profile</button>
              <button type="submit"
                className="btn btn-error my-4" onClick={changeToEdit}>Cancle</button>
            </div>

          </form>
        }
      </div>

      {/* logout */}
      <div>
        {userData.token ?
          <div className="w-9/12 mx-6 mb-8 flex justify-between align-middle">
            <p className="font-bold cursor-pointer" onClick={() => logOut()}>
              logout
            </p>
            <CiLogout className="text-xl" />
          </div>
          :
          <></>
        }

      </div>
      <Toaster position='top-right' />
    </div >
  );
}
