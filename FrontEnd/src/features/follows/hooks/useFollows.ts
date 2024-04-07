import { useDispatch } from 'react-redux'
import { SET_FOLLOW } from '@/store/RootReducer'
import { API } from '@/libs/api';

export default function useFollows() {
  const dispatch = useDispatch()

  
  async function handleFollow(followedUserId: number, isFollowed: boolean, id: number) {
    try {
      if(!isFollowed) {
        const res = await API.post("/follow", { followed_user_id: followedUserId });
        console.log(res)
        
        dispatch(SET_FOLLOW({ id, isFollowed }))
      } else {
        const res = await API.delete(`/follow/${followedUserId}`)
        console.log(res)

        dispatch(SET_FOLLOW({ id, isFollowed }))
      }
    } catch (err) {
      throw err
    }
  }


  return {
    handleFollow
  }
}
