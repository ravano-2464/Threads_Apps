import { Box, Text, Button, Image } from '@chakra-ui/react'
import { IFollow } from '@/types/Follow'
import useFollows from '../hooks/useFollows'

export function Follows(props: IFollow) {
  const { handleFollow } = useFollows()

  return (
    <>
      <Box display={"flex"} width="100%" mt={4} alignItems={"center"}>
        <Image
          src={props.picture ?? "https://www.greenscene.co.id/wp-content/uploads/2020/11/goku-ultra.jpg"}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          alt="user_profile_image"
        />

        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"}  flex={2}>
            <Box display={"flex"}>
              <Text fontWeight={'bold'}>{props.full_name}</Text>
            </Box>
            <Text color="white">@{props.username}</Text>
            <Text>{props.description}</Text>
          </Box>
          <Box flex={1} display="flex" justifyContent={"flex-end"} alignItems={'center'}>
            <Button
              variant= {props.is_followed ? 'outline' : 'solid' }
              colorScheme='green'
              borderRadius={'full'}
              onClick={() => handleFollow(props.user_id, props.is_followed, props.id)}
              size={'sm'}
            >
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}