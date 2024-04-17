import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { ThreadCard } from "@/features/threads";
import { useThreads } from "@/features/threads/Hooks/useThreads";
import { BiSolidImageAdd } from "react-icons/bi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

export default function Home() {
  const {
    getThreads,
    form,
    handlePost,
    handleChange,
    fileInputRef,
    handleButtonClick,
    isLoading,
    refetch,
  } = useThreads();
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    refetch();
  }, [isLoading]);

  return (
    <Box w={560} ms={-2}>
      <Text ms={5} fontSize={"2xl"} fontWeight={"bold"} mt={5} color={"white"}>Home</Text>

      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingY={"20px"}
        borderColor={"brand.white"}
      >
        <Box
          width={"575px"}
          paddingX={5}
          display={"flex"}
          alignItems={"center"}
          borderBottom={"1px solid #d3d3d3"}
          paddingBottom={"15px"}
        >
          <Box me={4}>
            <Avatar src={typeof auth?.image === "string" ? auth?.image : "https://cdn.motor1.com/images/mgl/VzMq0z/s3/bugatti-chiron-1500.jpg" } />
          </Box>

          <FormControl
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            bg={"transparent"}
            width={"100%"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Input
                placeholder="Apa yang sedang kamu pikirkan..."
                name="content"
                color={"white"}
                onChange={handleChange}
                value={form.content}
                border={"none"}
              />
              <Button
                variant={"ghost"}
                color={"brand.green"}
                onClick={handleButtonClick}
              >
                <BiSolidImageAdd
                  style={{
                    height: "50px",
                    width: "50px",
                    color: "green",
                  }}
                />
              </Button>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              <Box display={"flex"} justifyContent={"end"}>
                <Button
                  backgroundColor={"green"}
                  color={"white"}
                  colorScheme="green"
                  onClick={() => handlePost.mutate()}
                  borderRadius={"full"}
                  px={6}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>

        <Box>
          {getThreads?.map((item) => {
            return (
              <Box key={item.id} color={"white"}>
                <ThreadCard
                  id={item.id}
                  users={item?.users}
                  content={item.content}
                  likes_count={item.likes_count}
                  posted_at={item.posted_at}
                  replies_count={item.replies_count}
                  image={item.image}
                  is_liked={item.is_liked}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
