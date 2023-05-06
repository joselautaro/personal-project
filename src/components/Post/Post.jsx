import { useContext } from "react"
import { AuthContext} from '../../context/AuthContext'

export const Post = () => {

    const {user} = useContext(AuthContext)

    console.log(user)

    return (
        <div>Post</div>
    )
}
