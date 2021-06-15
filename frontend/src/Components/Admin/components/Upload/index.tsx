import { faImages, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component } from 'react'
import Dropzone, { DropEvent } from 'react-dropzone'

import './styles.scss'

type propsType = {
  onUpload: (<T extends File>(files: T[], event: DropEvent) => void);
  uploaded: boolean;
}

export default class Upload extends Component<propsType> {
  handleDrag(dragActive: boolean, dragReject: boolean) {
    const { uploaded } = this.props
    
    if (uploaded) {
      return <FontAwesomeIcon icon={faCheckDouble} />
    } else if (!dragActive) {
      return <FontAwesomeIcon icon={faImages} />
    } else if(dragReject) {
      return <FontAwesomeIcon icon={faTimesCircle} />
    }

    return <FontAwesomeIcon icon={faCheck} />
  }
  render() {
    const { onUpload } = this.props
    return (
      <Dropzone
        accept={["image/png", "image/jpeg", "image/pjpeg", "image/gif"]}
        onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}
              ${isDragReject ? 'reject' : ''}`}>
            {this.handleDrag(isDragActive, isDragReject)}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    )
  }
}