import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addFiles } from './files.service';
import React from 'react';

const fileUpload = (file:any, setProgress:React.Dispatch<React.SetStateAction<number>>, parentId:string, userEmail?:string) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress)
    },
    (error) => {
        alert(error)
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addFiles(downloadURL, file.name, parentId, userEmail)
        });
    });
}

export default fileUpload