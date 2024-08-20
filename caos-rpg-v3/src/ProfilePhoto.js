import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './ProfilePhoto.css';

function ProfilePhoto() {
    const [photo, setPhoto] = useState(null);
    const [cropData, setCropData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const cropperRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
            setShowModal(true);
        }
    };

    const getCroppedImage = () => {
        if (cropperRef.current) {
            const croppedDataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
            setCropData(croppedDataURL);
            setShowModal(false);
        }
    };

    return (
        <div className="profile-photo">
            <label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                />
                {cropData ? (
                    <img
                        src={cropData}
                        alt="Foto do Personagem"
                        className="final-photo"
                    />
                ) : (
                    <div className="photo-placeholder">Foto</div>
                )}
            </label>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <Cropper
                            src={photo}
                            style={{ height: 300, width: '100%' }}
                            // Cropper.js options
                            aspectRatio={1}
                            guides={false}
                            ref={cropperRef}
                        />
                        <button onClick={getCroppedImage} className="btn-save">Salvar</button>
                        <button onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePhoto;
