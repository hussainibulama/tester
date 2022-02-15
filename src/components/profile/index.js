import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Profile from '../../assets/avatar.png'
import styles from "./styles.module.css";
import instance from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ProfilePage = () => {
    const inputFile = useRef(null);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [role, setrole] = useState("");
    const [file, setFile] = useState(null)

    const uploadImgButton = () => {
       inputFile.current.click();
       
    };
  
    const handleImgChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        
        let fi =  inputFile.current.files[0];
        const reader = new FileReader();
        reader.onload = (e) =>{
          const res = e.target?.result;
          console.log("Handle by onChange"+ res);
          

        };
  
        reader.readAsDataURL(fi);

        upload(e.target.files[0]);
          
    }
    async function upload(item) {
      
      const data = new FormData();
      data.append("image", item);

      try {
        let res = await instance.put("/user/update_profile_image", data
          
      );
        let result = await res.data;
        if (result.statusCode === 200) {

     
          toast.success(
              result.message,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );

        } else {
         
          toast.success(
             result.message,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          
        }
      } catch (error) {
        console.log(error.response.data);
        let res = error.response.data.message;
        let response = res;
        toast.error(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    useEffect(() => {
        let details = JSON.parse(localStorage.getItem("userDetails"));
        setfirstName(details.lastName);
        setlastName(details.firstName);
        setemail(details.email);
        setrole(details.role?details.role:"");
    }, [file]);
    async function update() {
        try {
          let res = await instance.put("/user/update-profile", {
            firstName: firstName,
            lastName: lastName,
            email: email,
          });
          let result = await res.data;
          if (result.statusCode === 200) {
            localStorage.setItem("userDetails", JSON.stringify(result.data));
            setfirstName(result.data.firstName);
            setlastName(result.data.lastName);
            setemail(result.data.email);
            setrole(result.data.role);
            toast.success(
                JSON.stringify(String(result.message)),
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );

          } else {
           
            toast.success(
                JSON.stringify(String(result.message)),
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            
          }
        } catch (error) {
          console.log(error.response.data);
          let res = error.response.data.message;
          let response = String(res).replace(/["']+/g, "");
          toast.error(response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      const onSubmit = (e) => {
        e.preventDefault();
        update();
      }
    return ( 
        <div className={styles.section}>
      <ToastContainer />

            <div className={styles.section_header}>
                <h2>Profile</h2>
            </div>
            <div className={styles.section_body}>
                <div className={styles.row}>
                    <div className={styles.column1}>
                        <div className={styles.circle}>
                            {file === null && <img className={styles.profile_pic} src={Profile} alt="Profile Img"/>}
                            {file !== null && <img className={styles.profile_pic} src={file} alt="Profile Img"/>}
                        </div>
                        <div className={styles.p_image}>
                            <FontAwesomeIcon icon={faCamera} className={styles.upload_button} onClick={uploadImgButton} />
                            <input className={styles.file_upload} name="files" type="file" ref={inputFile} accept="image/*" onChange={handleImgChange} />
                        </div>
                        <div className={styles.full_info}>
                            <span className={styles.full_info_name}>{firstName} {lastName}</span>
                            <span className={styles.full_info_email}>{email}</span>
                        </div>
                    </div>
                    <div className={styles.column2}>
                        <div className={styles.line1}>
                            <div className={styles.first_name} style={{marginRight: '24px'}}>
                                <label htmlFor="">First Name</label>
                            
                                <input value={firstName} onChange={event => setfirstName(event.target.value)} placeholder="First Name"/>
                            </div>
                            <div className={styles.first_name}>
                                <label htmlFor="">Last Name</label>
                                <input value={lastName} onChange={event => setlastName(event.target.value)} placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className={styles.line2}>
                            <div className={styles.first_name} style={{marginRight: '24px'}}>
                                <label htmlFor="">Email</label>
                                <input onChange={event => setemail(event.target.value)} value={email} placeholder="Email"/>
                            </div>
                            <div className={styles.first_name}>
                                <label htmlFor="">Role</label>
                                <input value={role} disabled placeholder="Database Manager"/>
                            </div>
                        </div>
                        <button onClick={onSubmit} className={styles.save_button}>Save Changes</button> 
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default ProfilePage;