import { useCreatePostMutation } from "../services/api"
import { store, setError } from "../store/store"
import Toast from "../plugin/Toast"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useAddPost = ({ reset }: { reset: () => void }) => {
  const [createPost, { data, error, isLoading }] = useCreatePostMutation()
  const navigate = useNavigate()

  const addPost = async (postData: any) => {
    try {
      const imgFile = postData.image[0] // Extract the File object from the FileList
      await createPost({ ...postData, image: imgFile }).unwrap()
      setTimeout(() => {
        navigate('/')
      }, 500);
    } catch (err) {
      console.error('Error creating post:', err)
      store.dispatch(setError('Error creating post'))
      Toast('error', 'Post creation failed', 'There was an error creating the post.')
    }

  }


  useEffect(() => {
    if (data) {
      Toast('success', 'Post Created', 'Your post has been created successfully.')
      reset()
    }
    if (error) {
      Toast('error', 'Post creation failed', 'There was an error creating the post.')
    }
  }, [data, error, reset])

  return {
    addPost
  }
}

export default useAddPost