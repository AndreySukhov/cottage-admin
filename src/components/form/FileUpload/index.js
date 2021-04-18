import React, { useEffect, useState } from 'react';
import cc from 'classcat'
import {useDropzone} from 'react-dropzone';

import FileCard from './FileCard'
import processFiles from './processFiles'

import style from './style.module.css'

const FileUpload = ({
  previewText, options = {},
  onSuccess = () => {},
  defaultFiles = []
}) => {

  const [filesList, setFilesList] = useState(defaultFiles)
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({ ...options });

  const updateFiles = (files) => {
    const handleUpload = async (list) => {
      const newFiles = await processFiles(list)
      setFilesList([...filesList, ...newFiles])
    }

    handleUpload(files)
  }

  useEffect(() => {
    onSuccess(filesList.map((file) => file.id))
  }, [filesList])

  useEffect(() => {

    if (acceptedFiles.length) {
      updateFiles(acceptedFiles)
    }
  }, [acceptedFiles])

  const handleRemove = (id) => {
    setFilesList(filesList.filter((file) => {
      return file.id !== id
    }))
  }

  return (
    <section className={style.ctn}>
      {filesList.length > 0 && (
        <div className={style['files-list']}>
          {filesList.map((file) => {
            return (
              <FileCard
                id={file.id}
                name={file.name}
                key={file.id}
                handleRemove={(id) => handleRemove(id)}
              />
            )
          })}
        </div>
      )}
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
