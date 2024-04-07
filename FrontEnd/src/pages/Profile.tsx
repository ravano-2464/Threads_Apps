import React from "react";
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
  const [isAllPost, setIsAllPost] = React.useState<boolean>(true);
  const [isMedia, setIsMedia] = React.useState<boolean>(false);
  const [threadByUser, setThreadByUser] = React.useState<any[]>();
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

  const threadOnlyImg = threadByUser?.filter(
    (data: any) => data.image !== null
  );

  React.useEffect(() => {
    getThreadByUser();
  }, []);

  return (
    <Box height={"100vh"} overflowY={"scroll"}>
      <Box
        display={"flex"}
        width={"320px"}
        height={"fit-content"}
        position={"fixed"}
        left={"20px"}
        paddingRight={"30px"}
        borderRight={"1px solid #d3d3d3"}
        h={"100vh"}
      >
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
          <Navbar />
        </Box>
      </Box>

      <Box w={650} mx={"auto"} px={4}>
        <Box display={"inline-block"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => navigate("/")}
            mt={4}
          >
            <AiOutlineArrowLeft />
            <Text ms={4} fontWeight={"bold"} fontSize={"xl"}>
              {auth?.full_name}
            </Text>
          </Box>
        </Box>

        <Box>
          <Image
            src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985001.jpg&fm=jpg"
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
                : "https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
            }
            border={"4px solid white"}
            width={"80px"}
            height={"80px"}
            style={{ margin: "-45px 0 0 25px" }}
          />

          <Box display={"flex"} justifyContent={"end"}>
            <Button
              variant={"outline"}
              borderRadius={"full"}
              size={"xs"}
              borderColor={"gray"}
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
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {auth?.full_name}
          </Text>
          <Text color={"gray"} fontSize={"sm"}>
            @{auth?.username}
          </Text>
          {auth?.description ? (
            <Text>{auth?.description}</Text>
          ) : (
            <Text>Set your description...</Text>
          )}

          <Box display={"flex"} gap={5} mt={1}>
            <Box display={"flex"} gap={2} fontSize={"sm"}>
              <Text fontWeight={"bold"}>{0}</Text>
              <Text>Following</Text>
            </Box>
            <Box display={"flex"} gap={2} fontSize={"sm"}>
              <Text fontWeight={"bold"}>{0}</Text>
              <Text>Followers</Text>
            </Box>
          </Box>
        </Box>

        <Box display={"flex"} mt={5}>
          <Box
            w={"full"}
            onClick={handleAllPostChange}
            cursor={"pointer"}
            pb={2}
            borderBottom={isAllPost ? "1px solid red" : "1px solid #dbdbdb"}
          >
            <Text textAlign={"center"}>All Post</Text>
          </Box>
          <Box
            w={"full"}
            onClick={handleIsMediaChange}
            cursor={"pointer"}
            pb={2}
            borderBottom={isMedia ? "1px solid red" : "1px solid #dbdbdb"}
          >
            <Text textAlign={"center"}>Media</Text>
          </Box>
        </Box>

        <Box ms={-6}>
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
              <Text textAlign={"center"} fontWeight={"bold"} mt={10}>
                No Posts Yet
              </Text>
            )
          ) : threadOnlyImg && threadOnlyImg.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2} >
              {threadOnlyImg.map((data: any) => (
                <GridItem w="100%" h="100%" border={"1px solid #dbdbdb"}>
                  <Image key={data.id} src={data.image} alt="thread" w={"full"} h={"full"} />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Text textAlign={"center"} fontWeight={"bold"} mt={10}>
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
        paddingLeft={"35px"}
        borderLeft={"1px solid #d3d3d3"}
        h={"100vh"}
      >
        <Box mt={4}>
          <SuggestedFollow />
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
