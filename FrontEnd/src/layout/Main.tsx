import { Box, Text, Spinner } from "@chakra-ui/react";
import { ReactNode, useState, useEffect } from "react";
import { Footer, MyProfile, Navbar, SuggestedFollow } from "@/components";
import { Link } from "react-router-dom";
import { AUTH_LOGOUT } from "@/store/RootReducer";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/libs/api";
import { AiOutlineExport } from "react-icons/ai";

export default function Main({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
    setAuthToken("");
    window.location.reload();
  };

  return isLoading ? (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      position={"absolute"}
    >
      <Spinner color="green.500" marginTop={"150px"} />
      <Text mt={2}>Please wait...</Text>
    </Box>
  ) : (
    <>
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
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Navbar />

            <Link to={"/auth/login"} onClick={handleLogout}>
              <Text
                cursor={"pointer"}
                fontWeight={"bold"}
                mb={4}
                fontSize={"xl"}
                _hover={{ textDecoration: "underline" }}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                <AiOutlineExport />
                Logout
              </Text>
            </Link>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"center"}>
          {children}
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
          <Box>
            <MyProfile />
          </Box>

          <Box>
            <SuggestedFollow />
          </Box>

          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}
