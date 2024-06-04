import { Box, Card, CardBody, Text, Avatar, Button } from "@chakra-ui/react";
import useSuggestFollow from "../hooks/useSuggestFollow";
import useFollow from "@/features/follows/hooks/useFollows";
import React from "react";

export const SuggestedFollow = (): React.JSX.Element => {
  const { suggestFollow, mutationFollow } = useSuggestFollow();

  console.log(suggestFollow)

  return (
    <Box display={"flex"} width={"300px"} height={"fit-content"}>
      <Card
        width={"100%"}
        bg={"transparent"}
        boxShadow={"0 0 6px rgba(0, 0, 0, 0.5)"}
        padding={5}
      >
        <Text fontWeight={"bold"} mb={1} color={"white"}>
          Suggested for You
        </Text>
        {suggestFollow?.map((item: any) => {
          console.log(item)
          return (
            <CardBody
              display={"flex"}
              gap={2}
              p={0}
              my={1}
              alignItems={"center"}
              key={item.id}
            >
              <Avatar
                src={
                  item.image
                    ? item.image
                    : "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"
                }
                border={"2px solid #1d1d1d"}
                size={"sm"}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                flex={1}
                overflow={"hidden"}
              >
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                  color={"white"}
                >
                  {item?.full_name}
                </Text>
                <Text fontSize={"xs"} color={"gray"}>
                  @{item?.username}
                </Text>
              </Box>
              <Button
                size={"xs"}
                variant={item?.isFollowing ? "outline" : "solid"}
                borderRadius={"full"}
                colorScheme={item?.isFollowing ?? "green"}
                bg={!item?.isFollowing ? "green" : "gray"}
                _hover={{ bg: !item?.isFollowing ? "black" : "green" }}
                px={3}
                onClick={() => mutationFollow.mutate(item?.id)}
              >
                {item?.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </CardBody>
          );
        })}
      </Card>
    </Box>
  );
};