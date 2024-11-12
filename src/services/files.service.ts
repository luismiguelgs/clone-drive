import { database } from "@/lib/firebase"
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"

let files = collection(database, 'files')

export const addFiles = (imageLink:string, name:string, parentId:string, userEmail?:string) => {
    try{
        addDoc(files, {
            imageLink: imageLink,
            name: name,
            isFolder: false,
            parentId: parentId,
            userEmail: userEmail,
        })
    }
    catch(err){
        console.log(err);
    }
    
}
export const getFiles = (setFiles:React.Dispatch<React.SetStateAction<any>>, parentId?:string, userEmail='') => {
    let emailQuery = query(files, where('userEmail', '==', userEmail))
    if(!parentId){
        onSnapshot(emailQuery, (snapshot) => {
            setFiles(snapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            }).filter((file:any) => file.parentId === ''))
        })
    }else{
        onSnapshot(emailQuery, (snapshot) => {
            setFiles(snapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            }).filter((file:any) => file.parentId === parentId))
        })
    }
    
}
export const addFolder = (payload:{folderName:string, isFolder:boolean, fileList: object, parentId?:string, userEmail?:string | undefined | null}) => {
    try{
        addDoc(files, {
           ...payload}
        )
    }
    catch(err){
        console.log(err);
    }
}