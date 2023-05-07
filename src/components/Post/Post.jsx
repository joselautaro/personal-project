import { addDoc, collection, getFirestore, getDocs, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore"
import React, { useState, useEffect, useContext } from "react"
import { AiFillEdit } from 'react-icons/ai'
import { SlTrash } from 'react-icons/sl'
import { GrEdit } from 'react-icons/gr'
import { db } from '../../firebase'
import Swal from "sweetalert2"


export const Post = () => {

    const [posts, setPosts] = useState([])

    const [url, setUrl] = useState("")

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [currentId, setCurrentId] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("URL: ", url)
        console.log("Name: ", name)
        console.log("Description ", description)

        const post = {
            dates: {
                url,
                name,
                description
            }
            // data: firebase.firestore.Timestamp.fromDate(new Date())
        }

        const db = getFirestore()

        const newCollectionRef = collection(db, 'posts');
        addDoc(newCollectionRef, {
            url: url,
            name: name,
            description: description
        })
            .then((docRef) => {
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 700
                })
                console.log('Document  created with id: ', docRef.id);
                setDescription('')
                setName('')
                setUrl('')
            })
            .catch((error) => {
                console.error('Error to create id: ', error);
            });


        postRef.update({
            name: name,
            description: description,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    const getPosts = () => {
        const postsRef = collection(db, "posts");
        const unsubcribe = onSnapshot(postsRef, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });
            setPosts(posts)
            console.log(posts)
        });
        return () => unsubcribe()
    };

    useEffect(() => {
        getPosts();
    }, []);



    const handleDelete = (id) => {
        try {
             deleteDoc(doc(db, "posts", id));
            Swal.fire({
                title: 'Tu mensaje se ha eliminado',
                showConfirmButton: false,
                timer: 700
            })
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    // const handleEdit = (post, newValues, db) => {
    //     const postRef = doc(db, "posts", post.id);
    //     const updatedPost = { ...post, ...newValues };
    //     setDoc(postRef, updatedPost)
    //       .then(() => console.log("Document updated!"))
    //       .catch((error) => console.error("Error updating document: ", error));
    //   }




    return (
        
        <>
        <div className="container">
                <div className=" card text-center mb-3">
                    <div className="card-body">


                        {posts.map((post) => (
                            <div className="card mb-1" key={post.id} >
                                <div className="d-flex justify-content-end">
                                    {/* <GrEdit className="m-3" onClick={() => handle(post.id)} /> */}
                                    <SlTrash className="m-3" onClick={() => handleDelete(post.id)} />
                                </div>
                                <div className="card-body">

                                    <h4>{post.name}</h4>
                                    <p>{post.description}</p>
                                    <a href={post.url} target="_blanck" rel="noopener noreferrer" className="btn btn-info col-12">Ir al enlace</a>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <hr />
            <form onSubmit={handleSubmit} className="container mt-3">
            <button className="col-12 btn btn-success">Publicar</button>
                <div className="card text-center mb-3" >
                    <div className="card-body">
                        <h5 className="card-title">Agregar publicación</h5>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="si desea, escriba su url"
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}  
                            />
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="ingrese asunto del mensaje"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="escriba aquí su mensaje"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>
                    </div>
                </div>
                
            </form>
            <hr />
        </>
    )
}
