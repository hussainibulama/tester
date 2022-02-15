/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Loader from "../loader";

const CkEditor = ({ data, handleRichText }) => {
  const [value, setValue] = useState(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   setValue(data);
    // }, 1000);
    setValue(data);
  }, [data]);

  return (
    <div>
      {/* {loading && (
        <div className="overlay-spinner">
          <Loader />
        </div>
      )} */}
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          handleRichText(editor.getData());
        }}
        config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
      />
    </div>
  );
};

export default CkEditor;

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) => new Promise((resolve, reject) => {})
    );
  }

  abort() {}
}
