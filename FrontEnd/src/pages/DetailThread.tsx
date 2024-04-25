import { Box, Input, FormControl, Image, Text, Button } from '@chakra-ui/react'
import { ThreadCard } from '@/features/threads';
import { useState, useEffect, ChangeEvent } from 'react';
import { API } from '@/libs/api';
import { useSelector } from "react-redux";
import { RootState } from '@/store/type/RootState';
import { useParams } from "react-router-dom";
import { IThreadCard } from '@/types/Thread';
import { ReplyPost } from '@/types/Reply';
import useTimes from "@/utils/useTimes";
import { useQuery } from '@tanstack/react-query';

export default function DetailThread() {
  const { id } = useParams()
  const auth = useSelector((state: RootState) => state.auth)
  const [data, setData] = useState<IThreadCard>()
  const [reply, setReply] = useState<ReplyPost>({
    content: "",
    thread_id: parseInt(id as string)
  })

  useEffect(() => {
    getOneThread()
  }, [])

  async function getOneThread() {
    try {
      const response = await API.get(`/detail-thread/${id}`)
      
      setData(response.data[0])
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setReply({
      ...reply,
      [event.target.name]: event.target.value
    })
  }

  async function handlePost(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      
      await API.post("/reply", reply)
      setReply({
        content: "",
        thread_id: 0
      })
      refetch()
    } catch (err) {
      console.log(err);
    }
  }

  const { data: getReply, refetch } = useQuery({
    queryKey: ["replies"],
    queryFn: async () => await API.get(`/replies?thread_id=${id}`)
     .then(res => res.data)
  })

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        color={"white"}
        margin={4}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingY={"20px"}
        width="550px"
        marginLeft={"-20px"}
        borderColor={"brand.white"}
      >
        <ThreadCard
          id={data?.id}
          users={data?.users}
          content={data?.content}
          likes_count={Array.isArray(data?.likes) ? data?.likes.length : 0}
          posted_at={data?.posted_at}
          replies_count={data?.replies_count}
          image={data?.image}
          likes={data?.likes}
        />
        <Box marginTop={"20px"} width={"100%"} paddingX={5}>
          <form 
            onSubmit={handlePost} 
            encType="multipart/form-data"
          >
            <FormControl display={"flex"} flexDirection={"column"} gap={2} >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Input
                  color={"white"}
                  placeholder="What is happening?!"
                  name="content"
                  onChange={handleChange}
                  value={reply.content}
                />
                <Button
                  type="submit"
                  backgroundColor={"brand.green"}
                  colorScheme="green"
                  fontSize={"12px"}
                  width={"70px"}
                >Post</Button>
              </Box>
            </FormControl>
          </form>

          {getReply?.map((data: any, index: any) => (
            <Box 
              key={index}
              display={"flex"}
              width="575px"
              borderBottom={"1px solid #262626"}
              padding={"20px 0px"}
              bg={"transparent"} 
              marginLeft={"-20px"}
            >
              <Image
                ms={6}
                src={typeof auth?.image === "string" ? auth?.image : "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"}
                width={"50px"}
                height={"50px"}
                objectFit={"cover"}
                borderRadius={"50%"}
                marginRight={"20px"}
              />

              <Box>
                <Box display={"flex"} alignItems={'center'}>
                  <Text fontWeight={"bold"}>{data.users?.full_name}</Text>
                  <Text ms={2} color="gray" fontSize={"sm"}>@{data.users?.username}</Text>
                  <Text ms={2} color="gray" fontSize={"sm"}>
                  • {useTimes(data.posted_at)}
                  </Text>
                </Box>
            
                <Text>{data?.content}</Text>
              </Box>                
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}