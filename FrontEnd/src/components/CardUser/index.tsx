import { API } from "@/libs/api";
import { Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function CardUser(props: any) {
  const mutationFollow = useMutation({
    mutationFn: async (idUser: number) => {
      if (!props.isFollowing) {
        return await API.post("/follow", { followed_user_id: idUser });
      } else {
        return await API.delete(`/follow/${idUser}`);
      }
    },
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <Box display={"flex"} gap={2} p={0} mt={2} alignItems={"center"}>
      <Avatar
        src={
          props?.picture
            ? props?.picture
            : "https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
        }
        border={"2px solid black"}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={1}
        overflow={"hidden"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={"bold"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {props?.full_name}
        </Text>
        <Text fontSize={"xs"} color={"grey"}>
          @{props?.username}
        </Text>
        {props?.description && (
          <Text fontSize={"xs"} color={"grey"}>
            {props?.description}
          </Text>
        )}
      </Box>
      <Button
        size={"sm"}
        variant={props.isFollowing ? "outline" : "solid"}
        colorScheme="green"
        bg={props.isFollowing ? "white" : "green"}
        px={5}
        borderRadius={"full"}
        onClick={() => mutationFollow.mutate(props.id)}
      >
        {props.isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
}
