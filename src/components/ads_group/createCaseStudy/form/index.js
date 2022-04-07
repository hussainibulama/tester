import React,{useState,useEffect} from "react";
import { DropzoneArea } from "material-ui-dropzone";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelect from "../../../ui/customSelect";
import { tags } from "../../../../utils/tags";
import CkEditor from "../../../ui/ckeditor";
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import instance from "../../../../utils/axios";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    background: "white",
    padding: "24px",
    "& .MuiDropzoneArea-root": {
      height: "269px",
      background: "#F8F7F7",
      marginBottom: "24px",
    },
    "& .MuiDropzoneArea-textContainer": {
      padding: "10px",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .MuiDropzonePreviewList-image": {
      width: "auto",
      maxWidth: "80px",
      height: "auto",
      objectFit: "cover",
    },
  },
  myEditingArea: {
    minHeight: "347px",
  },
});

const Form = ({
Setter,
}) => {
  const classes = useStyles();
  const params = useParams();
  const [impression, setImpression] = useState(0);
  const [click, setClick] = useState(0);
  const [video, setVideo] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [feedtype, setfeedtype] = useState('');
  const [feed, setfeed] = useState('');
  const [bannertype, setbannertype] = useState('');
  const [banner, setbanner] = useState('');
  const [call, setcall] = useState('');
  const [calltype, setcalltype] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [allData, setAllData] = useState({"name":"","description":"","age":"","age_status":"","approval_status":"","approved_at":"","business_name":"","daily_budget":"","daily_spend":"","destination_link":"","end_date":"","gender":{"option":""},"gender_status":"","impression_cost":"","impression_limit":"","impression_time":"","location":{},"location_status":"","paid":"","total_budget":"",});

  async function fetchdata() {
    
      try {
        let res = await instance.get(
          '/advert/v2/admin/single-ad/' + params.id + '?platform=web',
        );

        let result = await res.data;
        if (result && result.status === 'success') {
          setAllData(result.data.data);
          Setter(result.data.data.approval_status);
          setClick(result.data.clicks);
          setVideo(result.data.video);
          setImpression(result.data.impression);
          setThumbnail(result.data.data.thumbnail);
          setName(result.data.data.name);
          setDescription(result.data.data.description);
          if (result.data.data.channels_media.feed) {
            setfeed(result.data.data.channels_media.feed.file);
            setfeedtype(result.data.data.channels_media.feed.mimetype);
          }
          if (result.data.data.channels_media.banner) {
            setbanner(result.data.data.channels_media.banner.file);
            setbannertype(result.data.data.channels_media.banner.mimetype);
          }
          if (result.data.data.channels_media.call) {
            setcall(result.data.data.channels_media.call.file);
            setcalltype(result.data.data.channels_media.call.mimetype);
          }
        }
      } catch (e) {
        console.log(e);
      }
    
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      <form>
        <div className={styles.column1}>
        <div className={styles.description}>
            <label htmlFor="ReactQuill">Report</label>
            <div className={styles.inline_text}>
            <h4>Impression:</h4><p>{impression?impression:0}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Click:</h4><p>{click?click:0}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Videos:</h4><p>{video?video:0}</p>
            </div>
           
           
          </div>
       
          <div className={styles.description}>
            <label htmlFor="ReactQuill">Description</label>
            <div className={styles.inline_text}>
            <h4>Name:</h4><p>{allData?allData.name:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Description:</h4><p>{allData?allData.description:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Destination Link:</h4><p>{allData?allData.destination_link:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Company Name:</h4><p>{allData?allData.business_name:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Start Date:</h4><p>{allData?moment(allData.start_date).format("ll"):""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>End Date:</h4><p>{allData?moment(allData.end_date).format("ll"):""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Advert Status:</h4><p>{allData?allData.status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Total Budget:</h4><p>{allData?allData.total_budget:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Daily Budget:</h4><p>{allData?allData.daily_budget:""}</p>
            </div>
          
            <div className={styles.inline_text}>
            <h4>Impression Cost:</h4><p>{allData?allData.impression_cost:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Impression Limit:</h4><p>{allData?allData.impression_cost:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Approval Status:</h4><p>{allData?allData.approval_status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Approval Date:</h4><p>{allData?moment(allData.approved_at).format("ll"):""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Publish Status:</h4><p>{allData?allData.publish_status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Payment Status:</h4><p>{allData?allData.paid===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Gender Status:</h4><p>{allData?allData.gender_status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Gender Options:</h4><p>{allData.gender !==null?allData.gender.option:"Null"}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Age Status:</h4><p>{allData?allData.age_status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Age Options:</h4><p>Min:{allData.age !==null?allData.age.min:""}, Max:{allData.age  !==null?allData.age.max:""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Location Status:</h4><p>{allData?allData.location_status===true?"True":"False":""}</p>
            </div>
            <div className={styles.inline_text}>
            <h4>Location Options:</h4><p>{allData?JSON.stringify(allData.location):""}</p>
            </div>
            <div className={classes.myEditingArea}>
              {/* <CkEditor
                data={description}
                handleRichText={(data) => {
                  setDescription(data);
                }}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.column2}>
       
          <div className={classes.root}>
            <label htmlFor="DropzoneArea">Channels Media</label>
            <h4>1. Call</h4>
            <div className={styles.slug}>
            {call !== '' && calltype === 'video' && (
              <ReactPlayer height={"100%"} width={"100%"} controls={true} playing={true} url={'' + call} />
            )}
           
            {call !== '' && calltype === 'image' && (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                src={'' + call}
                alt="images"
              />
            )}
            </div>
            <h4>2. Feed</h4>
            <div className={styles.slug}>
            {feed !== '' && feedtype === 'video' && (
              <ReactPlayer height={"100%"} width={"100%"} controls={true} playing={true} url={'' + feed} />
            )}

            {feed !== '' && feedtype === 'image' && (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                src={'' + feed}
                alt="images"
              />
            )}
            </div>
            <h4>3. Banner</h4>
            <div className={styles.slug}>
            {banner !== '' && bannertype === 'video' && (
              <ReactPlayer height={"100%"} width={"100%"} controls={true} playing={true} url={'' + banner} />
            )}

            {banner !== '' && bannertype === 'image' && (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                src={'' + banner}
                alt="images"
              />
            )}
              <h4>4. Thumbnail</h4>
            <div className={styles.slug}>
            <img
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                src={'' + thumbnail}
                alt="images"
              />
            </div>
            </div>
           
          
          </div>
         
        </div>
      </form>
    </div>
  );
};

export default Form;
