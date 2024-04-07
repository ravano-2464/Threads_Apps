import React from "react";
import CardUser from "@/components/CardUser";
import { API } from "@/libs/api";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineTeam } from "react-icons/ai";

export default function ListUser() {
  const [filter, setFilter]: [string, (search: string) => void] =
    React.useState("");
  const { data: getUsers, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const users = await API.get("/users");
        return users.data;
      } catch (err) {
        throw err;
      }
    },
  });

  const handleChangeFilter = (e: { target: { value: string } }) => {
    setFilter(e.target.value);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingY={"20px"}
        width="620px"
        marginLeft={"-10px"}
        borderColor={"brand.grey"}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineTeam color={"gray"} />
          </InputLeftElement>
          <Input
            variant={"outline"}
            borderRadius={"full"}
            placeholder="Search account ?"
            fontSize={"sm"}
            border={"1px solid #d3d3d3"}
            type="text"
            onChange={handleChangeFilter}
          />
        </InputGroup>

        {getUsers?.map((data: any) => {
          if (
            filter == "" ||
            data.full_name.toLowerCase().includes(filter.toLowerCase())
          ) {
            return (
              <Box width={"full"} mt={2} key={data.id} px={1}>
                <CardUser
                  id={data.id}
                  full_name={data?.full_name}
                  username={data?.username}
                  picture={data?.image}
                  description={data?.description}
                  isFollowing={data?.isFollowing}
                  refetch={refetch}
                />
              </Box>
            );
          }

          return null;
        })}
      </Box>
    </Box>
  );
}
