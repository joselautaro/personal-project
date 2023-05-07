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
                console.log('Document  created with id: ', docRef.id);
                setDescription('')
                setName('')
                setUrl('')
                Swal.fire({
                    icon: 'success',
                    title: 'Tu post ha sido publicado correctamente',
                    showConfirmButton: false,
                    timer: 1000
                })
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



    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            Swal.fire({
                icon: 'success',
                title: 'Tu post ha sido eliminado correctamente',
                showConfirmButton: false,
                timer: 1000
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
            <form onSubmit={handleSubmit} className="container mt-3">
                <div className="card text-center mb-3" >
                    <div className="card-body">
                        <h5 className="card-title">Agregar publicación</h5>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="ingrese url a agregar"
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                            />
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="ingrese nombre del sitio"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <input type="text" className="form-control" placeholder="ingrese descripción del sitio"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>
                    </div>
                </div>
                <button className="col-12 btn btn-success">Publicar</button>
            </form>
            <hr />
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
        </>
    )
}
