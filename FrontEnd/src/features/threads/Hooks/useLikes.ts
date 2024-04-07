import { API } from "@/libs/api";
import { useThreads } from "./useThreads";
const useLikes = () => {
  const { refetch } = useThreads();

  const handleIsLike = async (id?: number, isLike?: boolean) => {
    if (!isLike) {
      await API.post("/like", { thread_id: id });
      refetch();
    } else {
      await API.delete(`/like/${id}`);
      refetch();
    }
  };

  return {
    handleIsLike,
  };
};

export default useLikes;
