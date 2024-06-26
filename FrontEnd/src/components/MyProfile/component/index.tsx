import React from "react";
import { RootState } from "@/store/type/RootState";
import {
  Box,
  Card,
  Text,
  Image,
  Avatar,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { API } from "@/libs/api";
import { useNavigate } from "react-router-dom";

export function MyProfile() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [countFollow, setCountFollow] = React.useState({
    followers: 0,
    followings: 0,
  });

  React.useEffect(() => {
    async function fetch() {
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

    fetch();
  }, []);

  return (
    <>
      <Box display={"flex"} width={"300px"} height={"fit-content"}>
        <Card
          width={"100%"}
          bg={"transparent"}
          boxShadow={"0 0px 6px rgba(0, 0, 0, 0.5)"}
          padding={5}
        >
          <Text fontWeight={"bold"} color={"white"}>My Profile</Text>
          <Box>
            <Image
              src="https://timelinecovers.pro/facebook-cover/download/system-failure-hacker-nearby-facebook-cover.jpg"
              objectFit={"cover"}
              mt={2}
              borderRadius={"10px"}
              height={"60px"}
              width={"100%"}
            />
            <Avatar
              src={
                typeof auth?.image === "string"
                  ? auth?.image
                  : "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"
              }
              position={"absolute"}
              width={"50px"}
              height={"50px"}
              style={{ top: "85px", left: "40px" }}
            />
            <Button
              position={"absolute"}
              variant={"outline"}
              borderRadius={"full"}
              size={"xs"}
              _hover={{ bgColor: "gray" }}
              style={{ top: "120px", right: "20px" }}
              onClick={() => navigate(`/profile/${auth?.id}`)}
              color={"white"}
            >
              Edit Profile
            </Button>
          </Box>
          <CardBody p={0} mt={6}>
            <Text fontWeight={"bold"} fontSize={"md"} color={"white"}>
              {auth?.full_name}
            </Text>
            <Text fontSize={"xs"} color={"gray"}>
              @{auth?.username}
            </Text>
            <Text color={"white"}>
              {auth?.description ? auth?.description : "Set your description"}
            </Text>
            <Box display={"flex"} gap={3}>
              <Box display={"flex"} gap={2} fontSize={"xs"} color={"white"}>
                <Text fontWeight={"bold"}>{countFollow.followings}</Text>
                <Text>Following</Text>
              </Box>
              <Box display={"flex"} gap={2} fontSize={"xs"} color={"white"}>
                <Text fontWeight={"bold"}>{countFollow.followers}</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
