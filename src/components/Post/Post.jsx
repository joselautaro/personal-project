import { addDoc, collection, getFirestore, getDocs, onSnapshot, deleteDoc, doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import React, { useState, useEffect, useRef } from "react"
import { AiFillEdit } from 'react-icons/ai'
import { SlTrash } from 'react-icons/sl'
import { AiOutlineLike } from 'react-icons/ai'
import { FaShareSquare } from "react-icons/fa";
import { db } from '../../firebase'
import Swal from "sweetalert2"
import './Post.css'


export const Post = () => {

    const [posts, setPosts] = useState([])

    const [url, setUrl] = useState("")

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [shareURL, setShareURL] = useState("");


    // const user = auth.currentUser;

    // const [currentId, setCurrentId] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getFirestore();

        const post = {
            url: url,
            name: name,
            description: description,
            date: serverTimestamp(),// agregar la fecha del servidor
            likes: 0,
            // username: user.displayName
        };

        const newCollectionRef = collection(db, 'posts');
        addDoc(newCollectionRef, post)
            .then((docRef) => {
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 700
                });
                console.log('Document created with id: ', docRef.id);
                setDescription('');
                setName('');
                setUrl('');
            })
            .catch((error) => {
                console.error('Error creating document: ', error);
            });
    };

    // Funcion para obtener los posts y renderizarlos de nuevo con useEffect
    const getPosts = () => {
        const postsRef = collection(db, "posts");
        const unsubcribe = onSnapshot(postsRef, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });
            setPosts(posts)
            // console.log(posts)
        });
        return () => unsubcribe()
    };

    useEffect(() => {
        getPosts();
    }, []);


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

    // Función para compartir el post


    const handleShareClick = () => {
        setShareURL(window.location.href);
        if (navigator.share) {
            navigator.share({
                title: post.name,
                text: post.description,
                url: window.location.href
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        }
    }

    // const handleShare = (id) => {
    //     const postUrl = `${window.location.protocol}//${window.location.host}/post/${id}`;
    //     navigator.clipboard.writeText(postUrl);
    //     alert('La URL del post ha sido copiada al portapapeles.');
    //   }


    // Lista de post


    return (

        <>
            <div className="container">

                {posts.map((post) => (
                    <div className="card" key={post.id}>
                        <div className="d-flex justify-content-end">
                            {/* <GrEdit className="m-3" onClick={() => handle(post.id)} /> */}
                            <SlTrash onClick={() => handleDelete(post.id)} />
                        </div>
                        <div className="card-body text-center">
                            <h4>{post.name}</h4>
                            <p>{post.description}</p>
                            <button className="btn btn-primary" onClick={() => handleLike(post.id, post.likes)}><AiOutlineLike /></button>
                            <p>{post.likes} personas les gusta esto</p>
                             <button className="btn btn-primary" onClick={handleShareClick}>
                                <FaShareSquare />
                            </button>
                            <p className="time">
                                Publicado el {post.date ? new Date(post.date.seconds * 1000).toLocaleDateString("es-ES") : ''} a las{" "}
                                {post.date ? new Date(post.date.seconds * 1000).toLocaleTimeString("es-ES") : ''}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
           
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
                <form onSubmit={handleSubmit} className="form-container container">
                    <button className="col-12 btn btn-success">Publicar</button>
                    <div className="card text-center" >
                        <div className="card-body">
                            <h5 className="card-title">¿Como te sientes el dia de hoy?</h5>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                                <input type="text" className="form-control" placeholder="escriba aquí su estado"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <hr />
        </>
    )
}
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