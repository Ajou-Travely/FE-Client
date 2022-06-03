import { css } from "@emotion/react";
import travelApi from "@src/app/api/travelApi";
import Modal from "@src/components/modal";
import { useEffect, useState } from "react";

interface IUploadImageModalProps {
  travelId: string;
  scheduleId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UploadImageModal = ({
  travelId,
  scheduleId,
  onClose,
  onSuccess,
}: IUploadImageModalProps) => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadImage, { error, isSuccess, isLoading }] =
    travelApi.useUploadSchedulePhotosMutation();
  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const photos = new FormData();
    photos.append("photos", image.raw);
    console.log(travelId, scheduleId);
    uploadImage({ travelId, scheduleId, photos: [photos] });
    onClose();
  };
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);
  return (
    <Modal>
      <div
        css={css`
          position: relative;
          background: white;
          border-radius: 10px;
          width: 20vw;
          height: 40vh;
          display: flex;
          flex-direction: column;

          padding: 1rem;
        `}
      >
        <label htmlFor="upload-button">
          {image.preview ? (
            <img
              css={css`
                width: 30vmin;
                height: 30vmin;
              `}
              src={image.preview}
              alt="img"
            />
          ) : (
            <h3 className="text-center">눌러주세요</h3>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <button onClick={handleUpload}>사진 바꾸기</button>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
