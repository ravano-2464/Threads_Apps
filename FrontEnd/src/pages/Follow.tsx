import React from "react";
import { API } from "@/libs/api";
import { Follows } from "@/features/follows";
import { RootState } from "@/store/type/RootState";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GET_FOLLOWS, SET_FOLLOW_STATE } from "@/store/RootReducer";
import { Box, Text } from "@chakra-ui/react";

export default function Follow() {
  const dispatch = useDispatch();
  const followState = useSelector(
    (state: RootState) => state.follow.followState
  );
  const follows = useSelector((state: RootState) => state.follow.follows);
  const [isActiveFollowers, setIsActiveFollowers] =
    React.useState<boolean>(true);
  const [isActiveFollowing, setIsActiveFollowing] = React.useState<boolean>(
    !isActiveFollowers
  );

  React.useEffect(() => {
    async function fetch() {
      try {
        const response = await API.get(`/follows?type=followers`);
        dispatch(GET_FOLLOWS(response.data));
      } catch (err) {
        throw err;
      }
    }

    fetch();
  }, []);

  React.useEffect(() => {
    getFollowData();
  }, [followState]);

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }

  const handleActiveFollowers = async () => {
    dispatch(SET_FOLLOW_STATE("followers"));
    setIsActiveFollowing(!isActiveFollowing);
    setIsActiveFollowers(!isActiveFollowers);
  };

  const handleActiveFollowing = async () => {
    dispatch(SET_FOLLOW_STATE("followings"));
    setIsActiveFollowing(!isActiveFollowing);
    setIsActiveFollowers(!isActiveFollowers);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        paddingY={"20px"}
        width="620px"
        marginLeft={"-10px"}
        borderColor={"brand.grey"}
      >
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          Follow
        </Text>

        <Box display={"flex"} textAlign={"center"}>
          <Box onClick={handleActiveFollowers} w={"full"} cursor={"pointer"}>
            <Text
              w={"full"}
              fontSize={"md"}
              pb={2}
              borderBottom={isActiveFollowers ? "1px solid red" : "1px solid #dbdbdb"}
            >
              Followers
            </Text>
          </Box>

          <Box onClick={handleActiveFollowing} w={"full"} cursor={"pointer"}>
            <Text
              w={"full"}
              fontSize={"md"}
              pb={2}
              borderBottom={isActiveFollowing ? "1px solid red" : "1px solid #dbdbdb"}
            >
              Following
            </Text>
          </Box>
        </Box>

        <Box px={4}>
          {follows?.map((follow, index) => (
            <Follows
              key={index}
              id={follow.id}
              user_id={follow.user_id}
              full_name={follow.full_name}
              username={follow.username}
              email={follow.email}
              picture={follow.picture}
              description={follow.description}
              is_followed={follow.is_followed}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
