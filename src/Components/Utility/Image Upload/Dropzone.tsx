import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";

interface IProps {
  setFile : (file: File)=>void
}

const Dropzone : React.FC<IProps> = (props) => {

  const [objUrl, setobjUrl] = useState<any>(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);

      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setobjUrl(acceptedFiles[0].preview);
      
      props.setFile(acceptedFiles[0]);

    },
    [props]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const drop_area_style = {
    backgroundImage: "url('" + objUrl + "')",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <div>
      <h5>Drop or click to attach image</h5>
      <div className="drop_zone">
        <div style={drop_area_style} className="drop_area" {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
