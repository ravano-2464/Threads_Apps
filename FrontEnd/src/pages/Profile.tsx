import React, { useEffect, useState } from "react";
import { Footer, Navbar, SuggestedFollow } from "@/components";
import { RootState } from "@/store/type/RootState";
import {
  Box,
  Text,
  Avatar,
  useDisclosure,
  Image,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ThreadCard } from "@/features/threads";
import EditProfileModal from "@/features/profile/components/EditProfileModal";
import { API } from "@/libs/api";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [countFollow, setCountFollow] = useState<{ followers: number; followings: number }>({ followers: 0, followings: 0 });
  const [isAllPost, setIsAllPost] = useState<boolean>(true);
  const [isMedia, setIsMedia] = useState<boolean>(false);
  const [threadByUser, setThreadByUser] = useState<any[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAllPostChange = (): void => {
    setIsAllPost(!isAllPost);
    setIsMedia(!isMedia);
  };

  const handleIsMediaChange = (): void => {
    setIsAllPost(!isAllPost);
    setIsMedia(!isMedia);
  };

  const getThreadByUser = async () => {
    try {
      const response = await API.get(`/thread/${Number(id)}`);
      setThreadByUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const threadOnlyImg = threadByUser?.filter((data: any) => data.image !== null);

  useEffect(() => {
    getThreadByUser();

    async function fetchFollowCounts() {
      try {
        const sumFollowers = await API.get(`/follows?type=followers`);
        const sumFollowings = await API.get(`/follows?type=followings`);

        setCountFollow({
          followers: sumFollowers.data.length,
          followings: sumFollowings.data.length,
        });
      } catch (err) {
        throw err;
      }
    }

    fetchFollowCounts();
  }, []);

  return (
    <Box backgroundColor="#1d1d1d" height={"100vh"} overflowY={"scroll"}>
      <Box
        display={"flex"}
        width={"290px"}
        height={"fit-content"}
        position={"fixed"}
        left={"20px"}
        borderRight={"1px solid #262626"}
        paddingRight={"-30px"}
        h={"100vh"}
      >
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
          <Navbar />
        </Box>
      </Box>

      <Box w={625} mx={"auto"} px={4}>
        <Box display={"inline-block"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => navigate("/")}
            mt={4}
          >
            <AiOutlineArrowLeft color={"white"}/>
            <Text ms={4} fontWeight={"bold"} fontSize={"xl"} color={"white"}>
              👋🏻 {auth?.full_name}
            </Text>
          </Box>
        </Box>

        <Box>
          <Image
            src="https://timelinecovers.pro/facebook-cover/download/system-failure-hacker-nearby-facebook-cover.jpg"
            objectFit={"cover"}
            mt={4}
            borderRadius={"10px"}
            height={"100px"}
            width={"100%"}
          />

          <Avatar
            src={
              typeof auth?.image === "string"
                ? auth?.image
                : "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"
            }
            width={"80px"}
            height={"80px"}
            style={{ margin: "-45px 0 0 25px" }}
          />

          <Box display={"flex"} justifyContent={"end"}>
            <Button
              color={"white"}
              variant={"outline"}
              borderRadius={"full"}
              size={"xs"}
              borderColor={"gray"}
              bgColor={"gray"}
              mt={-5}
              paddingX={4}
              onClick={() => onOpen()}
            >
              Edit Profile
            </Button>

            <EditProfileModal isOpen={isOpen} onClose={onClose} />
          </Box>
        </Box>

        <Box>
          <Text fontWeight={"bold"} fontSize={"2xl"} color={"white"}>
            👋🏻 {auth?.full_name}
          </Text>
          <Text color={"gray"} fontSize={"sm"}>
            @{auth?.username}
          </Text>
          {auth?.description ? (
            <Text color={"white"}>{auth?.description}</Text>
          ) : (
            <Text color={"white"}>Set your description...</Text>
          )}

          <Box display={"flex"} gap={5} mt={1}>
            <Box display={"flex"} gap={2} fontSize={"sm"}>
              <Text fontWeight={"bold"} color={"white"}>{countFollow.followings}</Text>
              <Text color={"white"}>Following</Text>
            </Box>
            <Box display={"flex"} gap={2} fontSize={"sm"}>
              <Text fontWeight={"bold"} color={"white"}>{countFollow.followers}</Text>
              <Text color={"white"}>Followers</Text>
            </Box>
          </Box>
        </Box>

        <Box display={"flex"} mt={5}>
          <Box
            w={"full"}
            onClick={handleAllPostChange}
            cursor={"pointer"}
            pb={2}
            borderBottom={isAllPost ? "2px solid green" : "1px solid #dbdbdb"}
          >
            <Text textAlign={"center"} color={"white"}>All Post</Text>
          </Box>
          <Box
            w={"full"}
            onClick={handleIsMediaChange}
            cursor={"pointer"}
            pb={2}
            borderBottom={isMedia ? "2px solid green" : "1px solid #dbdbdb"}
          >
            <Text textAlign={"center"} color={"white"}>Media</Text>
          </Box>
        </Box>

        <Box ms={-6} color={"white"}>
          {isAllPost ? (
            threadByUser && threadByUser.length > 0 ? (
              threadByUser.map((data: any) => (
                <ThreadCard
                  key={data.id}
                  id={data.id}
                  content={data.content}
                  image={data.image}
                  is_liked={data.is_liked}
                  likes_count={data.likes_count}
                  posted_at={data.posted_at}
                  replies_count={data.replies_count}
                  users={data.users}
                />
              ))
            ) : (
              <Text textAlign={"center"} fontWeight={"bold"} mt={10} color={"white"}>
                No Posts Yet
              </Text>
            )
          ) : threadOnlyImg && threadOnlyImg.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2} >
              {threadOnlyImg.map((data: any) => (
              <GridItem w="100%" h="100%" border={"1px solid #dbdbdb"}>
                <Image key={data.id} src={`http://localhost:5000/uploads/${data?.image}`} alt="thread" w={"full"} h={"full"} />
              </GridItem>              
              ))}
            </Grid>
          ) : (
            <Text textAlign={"center"} fontWeight={"bold"} mt={10} color={"white"}>
              No Media Yet
            </Text>
          )}
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"0px"}
        paddingTop={"10px"}
        paddingLeft={"-30px"}
        borderLeft={"1px solid #262626"}
        h={"100vh"}
      >
        <Box mt={4} paddingLeft={"10px"}>
          <SuggestedFollow />
        </Box>

        <Box paddingLeft={"10px"}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}