import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IThreadCard } from "@/types/Thread";
import { BsCircleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import useLikes from "../Hooks/useLikes";
import useTimes from "@/utils/useTimes";

export const ThreadCard = (props: IThreadCard): React.JSX.Element => {
  const navigate = useNavigate();
  const { handleIsLike } = useLikes();

  return (
    <>
      <Box
        display={"flex"}
        width="575px"
        borderBottom={"1px solid #262626"}
        padding={"20px 20px"}
      >
        <Image
          src={
            typeof props.users?.image === "string"
              ? props.users?.image
              : "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"
          }
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          style={{ boxShadow: "inset 0 0 50px rgba(0, 0, 0, 1)" }}
        />

        <Box w={"70%"}>
          <Box display={"flex"} alignItems={"center"}>
            <Text fontWeight={"bold"}>{props.users?.full_name}</Text>
            <Text ms={2} color="gray" fontSize={"sm"}>
              @{props.users?.username}
            </Text>
            <BsCircleFill
              style={{
                width: "5px",
                marginTop: 3,
                marginLeft: 10,
                color: "#dbdbdb",
              }}
            />
            <Text ms={2} color="gray" fontSize={"sm"}>
              {useTimes(props.posted_at)}
            </Text>
          </Box>
          <Text>{props.content}</Text>

          {props.image && (
            <Image
              mt={3}
              src={"http://localhost:5000/uploads/" + props.image}
              width={"100%"}
              height={"300px"}
              objectFit={"fill"}
              marginRight={"20px"}
            />
          )}
          <Box display={"flex"} gap={5} marginTop={"10px"} color={"white"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              backgroundColor={"transparent"}
              cursor={"pointer"}
              color={props.is_liked ? "red" : "white"}
              onClick={() => handleIsLike(props.id, props?.is_liked)}
              gap={1}
              _hover={{ color: "gray" }}
            >
              {props.likes_count}
              <AiFillHeart />
            </Box>
          
            <Box
              display={"flex"}
              alignItems={"center"}
              backgroundColor={"transparent"}
              gap={1}
              cursor={"pointer"}
              onClick={() => navigate(`/thread/${props.id}`)}
              _hover={{ color: "gray" }}
            >
              <FaComments /> 
              {props.replies_count} Replies
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
