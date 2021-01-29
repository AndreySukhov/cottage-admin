import React, { useEffect, useCallback } from 'react';
import cc from 'classcat'
import {useDropzone} from 'react-dropzone';

import style from './style.module.css'

const FileUpload = ({
  previewText, options = {}
}) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles, 'acceptedFiles')
  }, [])

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({ ...options, onDrop });

  useEffect(() => {

    console.log(acceptedFiles, 'acceptedFiles')

  }, [acceptedFiles])


  return (
    <section className={style.ctn}>
      <div
        {...getRootProps({className: cc([style.dropzone, {
          [style['drag-active']]: isDragActive
        }])})}
      >
        <input {...getInputProps()} />
        <div className={style['preview-text']}>{previewText}</div>
      </div>
    </section>
  );
}

export default FileUpload
