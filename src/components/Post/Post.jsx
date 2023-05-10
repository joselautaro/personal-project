import { addDoc, collection, getFirestore, getDocs, onSnapshot, deleteDoc, doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react"
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

    const [posting, setPosting] = useState(false);

    // const user = useUser() 

    const auth = getAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getFirestore();
        // const user = auth.currentUser;
        

        const post = {
            url: url,
            name: name,
            description: description,
            date: serverTimestamp(),// agregar la fecha del servidor
            likes: 0,
            // username: user.displayName
            // username: user.displayName
            user: {
                id: user.uid, // Agregar el ID del usuario
                name: user.displayName // Agregar el nombre del usuario
              }
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
                setPosting(true);
                // sharePost(docRef.id);
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


    const sharePost = (postId) => {
        const shareUrl = `${window.location.origin}/post/${postId}`;
        navigator.clipboard.writeText(shareUrl);
        if (!posting) {
            Swal.fire({
                icon: 'success',
                // title: `El link de tu publicación es: ${shareUrl}`,
                html: `
                    <p>Copialo y pegalo donde quieras</p>
                    <button onclick="navigator.clipboard.writeText('${shareUrl}')">
                    <i class="fas fa-copy">Copiar</i> 
                    </button>
                    `
            });
        }
    };

    // const SharePost = ({ postId }) => {
    //     const [posting, setPosting] = useState(false);

    //     const shareUrl = `${window.location.origin}/post/${postId}`;

    //     const handleCopyClick = () => {
    //       navigator.clipboard.writeText(shareUrl);
    //       Swal.fire({
    //         icon: 'success',
    //         title: '¡Enlace copiado!',
    //         text: 'Puedes pegarlo donde quieras',
    //         timer: 3000, // opcional: muestra el mensaje durante 3 segundos
    //         timerProgressBar: true, // opcional: muestra una barra de progreso
    //         showConfirmButton: false, // opcional: no muestra el botón de confirmación
    //       });
    //     };

    //     return (
    //       <button onClick={handleCopyClick} disabled={posting}>
    //         <FiCopy />
    //         Copiar enlace
    //       </button>
    //     );
    //   };
    //   En este ejemplo, utilizo el icono FiCopy del paquete react-icons/fi. También agregué un estado posting para deshabilitar el botón mientras se está realizando la publicación. Al hacer clic en el botón, se llama a navigator.clipboard.writeText() para copiar la URL y se muestra un mensaje de éxito utilizando Swal.fire(). Este mensaje desaparece automáticamente después de 3 segundos.











    // Lista de post


    return (
        <>
        <form onSubmit={handleSubmit} className="form container mb-2">
                <div className="card text-center" >
                    <div className="card-body">
                        <h5 className="card-title">¿Como te sientes el dia de hoy?</h5>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" placeholder="escriba aquí su estado"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <span className="input-group-text" id="inputGroup-sizing-sm"><AiFillEdit /></span>
                            <button className="col-12 btn btn-success">Publicar</button>
                        </div>
                    </div>
                    
                </div>
            </form>
            <div className="container">
                <div style={{ height: '100%', width: '100%' }}>
                    {posts.map((post) => (
                        <div className="card mb-2" key={post.id}>
                            <div className="container d-flex justify-content-end">
                                {/* <GrEdit className="m-3" onClick={() => handle(post.id)} /> */}
                                <SlTrash className="m-2" onClick={() => handleDelete(post.id)} />
                            </div>
                            <div className="card-body text-center">
                            <p className="card-text">Posted by: {post.id.name}</p>

                                <h4>{post.name}</h4>
                                <p>{post.description}</p>
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