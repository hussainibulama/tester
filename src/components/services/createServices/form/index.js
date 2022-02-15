import { useState } from 'react'
import Service from '../../../../assets/SERVICE 1.png'
import {DropzoneArea} from 'material-ui-dropzone'
import styles from './styles.module.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        background: 'white',
        marginBottom: '24px',
        padding: '24px',
        '& .MuiDropzoneArea-root': {
          height: '269px',
          display: 'flex',
          background: '#F8F7F7',
          marginBottom: '24px',
        },
        '& .MuiDropzoneArea-textContainer': {
            padding: '10px',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    myEditingArea: {
        minHeight: '347px'
    }
});

const Form = () => {
    const [image, setImage] = useState([]);

    
    const classes = useStyles();
    return ( 
        <div>

            <form >
                <div className={styles.column1}>
                    <div className={styles.title}>
                        <input placeholder="Service Title"/>
                    </div>
                    <div className={styles.description}>
                        <img src={Service} alt=""/>
                    </div>
                </div>
                <div className={styles.column2}>
                    <div className={styles.category}>
                        <select>
                            <option value="" disabled selected hidden>Select Category</option>
                        </select>
                    </div>
                    <div className={classes.root}>
                        <label htmlFor="DropzoneArea">Settings</label>
                        <DropzoneArea
                            onChange={setImage}
                            value={image}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            maxFileSize={5000000}
                        />
                        <div className={styles.imageAlt}>
                            <input placeholder="Image alt text"/>
                        </div>
                    </div>
                    <div className={styles.seoSettings}>
                        <label htmlFor="">SEO Settings</label>
                        <div className={styles.title}>
                            <input placeholder="Seo Title"/>
                        </div>
                        <div className={styles.slug}>
                            <input placeholder="Slug"/>
                        </div>
                        <div className={styles.metaDescription}>
                            <textarea placeholder="Meta Description">

                            </textarea>
                        </div>
                    </div>

                </div>
            </form>
        </div>
        
     );
}
 
export default Form;