import React,{useState, useEffect} from "react";
import styles from "./createCareers/form/styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../utils/axios";

const Topup = (props) => {
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  const [inputValues, setInputValues] = useState({
    name: "",
    slug: "",
    pageId:"",
   
  });
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
 
  };
  useEffect(() => {
    (async () => {
      let res = await instance.get("/page/get_all_page_templates");
      let result = await res.data;
     setData(result);
    })();
  },[]);
  async function Add() {
    if(inputValues.title !=="" &&
    inputValues.visibility !=="" ){
      try {
        let res = await instance.post("/menu-categories/1/sub-menu", {
          name: inputValues.name,
          slug: inputValues.slug,
    
          
        });
        let result = await res.data;
        if (result.statusCode === 200) {
      setLoading(false);
          toast.success(JSON.stringify(result.message), {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
     
          setInputValues({
            name: "",
            slug: "",
       
          });
        } else {
      setLoading(false);
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
      
          setInputValues({
            name: "",
            slug: "",
          });
   
  
        }
      } catch (error) {
        let res = error.response.data.message;
        let response = String(res);
      setLoading(false);
        toast.error(JSON.stringify(String(response)), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    
  
      }
    }else {
      toast.error("Please fill out all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Add();
  };
  return (
    <div className="modals" onClick={closeModal} style={divStyle}>
      {" "}
      <ToastContainer />

      <div className="modalsabt" onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className="flex-modal-exit">
          <div>
            
          </div>
          <div style={{marginTop:"-3em"}}>
            <button className="close" onClick={closeModal}>
              x
            </button>
          </div>
        </div>
        <div className="contents">

            <br/>
             <div className={styles.seoSettings}>
          <div className={styles.type}>
           <select name="name"   onChange={handleChange}>
             <option disabled selected hidden>Select parent menu</option>
             {data.map((datas)=>(
                <>
              
                  <option>
                {datas}
              </option>
             
    
              </>
              ))}
           
       
             </select>
          </div>
          </div>
          <br/>
          <div className={styles.seoSettings}>
            <div className={styles.title} >
            
              <input
                type="text"
                name="slug"
                onChange={handleChange}
                placeholder="Enter Category Menu Name"
                
              />
              
             
            </div>
            {/*
            <div className={styles.title} >
            <input
                type="text"
                name="pageId"
                onChange={handleChange}
                placeholder="Page ID"
                
              />
              </div>
              */}
          </div>
          
         
         
        </div>

         
       
             
             <button onClick={onSubmit} disabled={Loading}  className="section_header_button">Add New</button>
    
      </div>
      

    </div>
  );
};
export default Topup;
