import { Upload } from "lucide-react";
import { useState } from "react";

function EvidenceUploader() {

  const [files, setFiles] = useState([]);

  const handleFiles = (event) => {

    const selected =
      Array.from(event.target.files);

    setFiles(selected);
  };

  return (
    <div>

      <label className="upload-box">

        <Upload size={30} />

        <strong>
          Upload Evidence
        </strong>

        <span>
          Photos or videos up to 10MB
        </span>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFiles}
          hidden
        />

        <span className="upload-button">
          Choose Files
        </span>

      </label>

      {files.length > 0 && (

        <div className="file-list">

          {files.map((file) => (
            <p key={file.name}>
              📎 {file.name}
            </p>
          ))}

        </div>

      )}

    </div>
  );
}

export default EvidenceUploader;