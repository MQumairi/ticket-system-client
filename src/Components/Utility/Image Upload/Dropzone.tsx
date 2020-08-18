import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import { IAttachment } from "../../../Models/attachment";

interface IProps {
  setFile : (file: File)=>void,
  defaultAttach? : IAttachment,
  square?: boolean
}

const Dropzone : React.FC<IProps> = (props) => {

  const [objUrl, setobjUrl] = useState<any>(null);

  useEffect(() => {
    console.log("use effecting");
    if(props.defaultAttach) setobjUrl(props.defaultAttach.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);

      setobjUrl("");

      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setobjUrl(acceptedFiles[0].preview);
      
      props.setFile(acceptedFiles[0]);

      acceptedFiles = null;
    },
    [props]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  let square_style = {};

  if(props.square) {
    square_style = {
      width: "150px"
    }
  }

  const drop_area_style = {
    backgroundImage: "url('" + objUrl + "')",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <div>
      <h5>Drop or click to attach image</h5>
      <div className="drop_zone" style={square_style}>
        <div style={drop_area_style} className="drop_area" {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
