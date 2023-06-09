import { addDoc, collection, getFirestore, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { subirArchivos } from "../../firebase";
import React, { useState, useEffect } from "react"
import { AiFillEdit } from 'react-icons/ai'
import { SlTrash } from 'react-icons/sl'
import { FcCheckmark } from 'react-icons/fc'
import { AiOutlineLike } from 'react-icons/ai'
import { FaShareSquare } from "react-icons/fa";
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { db } from '../../firebase'
import Swal from "sweetalert2"
import './Post.css'


export const Post = (props) => {

    const [posts, setPosts] = useState([])

    const [description, setDescription] = useState("")

    const [posting, setPosting] = useState(false);

    const [currentUser, setCurrentUser] = useState(props.getUser());

    const [file, setFile] = useState(null)

    const [imageURL, setImageURL] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageURL = await subirArchivos(file);
        // Agrega el post a Firestore
        const db = getFirestore();
        const post = {
          name: currentUser.displayName,
          description: description,
          date: serverTimestamp(),
          likes: 0,
          imageURL: imageURL || null
        };
        const newCollectionRef = collection(db, "posts");
        await addDoc(newCollectionRef, post);
      
        // Reinicia los estados del formulario
        setDescription("")
        setFile(null)
        setImageURL(imageURL);
    };
    
    //   Reseteamos el valor del form

    // Funcion para obtener los posts y renderizarlos de nuevo con useEffect
    const getPosts = () => {
        const postsRef = collection(db, "posts");
        const unsubcribe = onSnapshot(postsRef, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });
            setPosts(posts)
        });
        return () => unsubcribe()
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleLogoutClick = () => {
        firebase.auth().signOut();
    };

    // Funcion para eliminar los posts
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



    // Funcion para darle like a una publicación
    const handleLike = (postId, currentLikes) => {
        const postRef = doc(db, "posts", postId);
        updateDoc(postRef, { likes: currentLikes + 1 })
            .then(() => {
                console.log("Like updated successfully");
                const updatedPosts = [...posts];
                const index = updatedPosts.findIndex(post => post.id === postId); // encontrar el índice del post que se está actualizando
                updatedPosts[index].likes = currentLikes + 1;
                setPosts(updatedPosts);
            })
            .catch((error) => {
                console.error("Error updating like: ", error);
            });
    };

    // Funcion para compartir
    const sharePost = (postId) => {
        const shareUrl = `${window.location.origin}/post/${postId}`;
        navigator.clipboard.writeText(shareUrl);
        if (!posting) {
            Swal.fire({
                icon: 'success',
                html: `
                    <p>Copialo y pegalo donde quieras</p>
                    <button onclick="navigator.clipboard.writeText('${shareUrl}')">
                    <i class="fas fa-copy">Copiar</i> 
                    </button>
                    `
            });
        }
    };


    return (
        <>

            <form onSubmit={handleSubmit} className="form container mt-5 w-100">
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Hola, {props.userName}¿Como te sientes el dia de hoy?</h5>
                        <RiLogoutBoxRFill className="login" onClick={handleLogoutClick} />
                        <div className="input-group input-group-sm">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escriba aquí su estado"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <input type="file" onChange={e => setFile(e.target.files[0])} />
                            <span className="input-group-text" id="inputGroup-sizing-sm">
                                <AiFillEdit />
                            </span>
                            <button className="col-auto">
                                <FcCheckmark style={{ color: 'black' }} size="2em" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="container  mt-5">
                <div className="cards" style={{ height: '100%', width: '100%' }}>
                    {posts.map((post) => (
                        <div className="card mt-2" key={post.id}>
                            <div className="container d-flex justify-content-end">
                                <SlTrash className="m-2" onClick={() => handleDelete(post.id)} />
                            </div>
                            <div className="card-body text-center">
                                <p className="card-text">Posted by: {post.id.name}</p>

                                <h4>{post.name}</h4>
                                <p>{post.description}</p>
                                {post.imageURL && <img src={post.imageURL} alt="Post image" />}
                                <AiOutlineLike className="m-2"
                                    onClick={() => handleLike(post.id, post.likes)}
                                />
                                {post.likes} personas les gusta esto
                                <FaShareSquare className="m-2" onClick={() => sharePost(post.id)}
                                />
                                <p className="time">
                                    Publicado el {post.date ? new Date(post.date.seconds * 1000).toLocaleDateString("es-ES") : ''} a las{" "}
                                    {post.date ? new Date(post.date.seconds * 1000).toLocaleTimeString("es-ES") : ''}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
{/* <GrEdit className="m-3" onClick={() => handle(post.id)} /> */ }
{/* <div className="input-group input-group-sm mb-3">
    <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
    <input type="text" className="form-control" placeholder="si desea, escriba su url"
    onChange={(e) => setUrl(e.target.value)}
    value={url}
    />
</div> */}

{/* <div className="input-group input-group-sm mb-3">
    <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
    <input type="text" className="form-control" placeholder="ingrese asunto del mensaje"
        onChange={(e) => setName(e.target.value)}
        value={name}
    />
</div> */}

{/* <a href={post.url} target="_blanck" rel="noopener noreferrer" className="btn btn-info col-12">Ir al enlace</a> */ }