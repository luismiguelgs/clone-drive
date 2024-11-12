import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export function GET(req: NextApiRequest, res: NextApiResponse) 
{
    return NextResponse.json({ name: 'John Doe' });
}

const fileUpload = (file:any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
    },
    (error) => {
        alert(error)
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
        });
    });
}