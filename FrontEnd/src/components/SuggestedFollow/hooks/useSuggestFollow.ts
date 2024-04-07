import React from "react";
import { API } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  picture: string | null;
  description: string | null;
}

export default function useSuggestFollow() {
  const [suggestFollow, setSuggestFollow] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await API.get("/users");
      console.log(response)
      setSuggestFollow(shuffle(response.data));
    } catch (err) {
      throw err;
    }
  }

  function shuffle(array: User[]) {
    const copiedArray = [...array];

    for (
      let currentIndex = copiedArray.length - 1;
      currentIndex > 0;
      currentIndex--
    ) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      
      [copiedArray[currentIndex], copiedArray[randomIndex]] = [
        copiedArray[randomIndex],
        copiedArray[currentIndex],
      ];
    }

    const spliceArray = copiedArray.splice(0, 4);
    
    const filterIsfollowed = spliceArray.filter((data: any) => data.isFollowing == false)

    return filterIsfollowed;
  }

  const mutationFollow = useMutation({
    mutationFn: async (idUser: number) => {
        await API.post("/follow", {followed_user_id: idUser})
    },
    onSuccess: () => {
      getUsers()
    },
  })


  return { suggestFollow, mutationFollow };
}
