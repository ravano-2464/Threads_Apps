// import { Box, Text, Button, } from '@chakra-ui/react'
// import { Link, useNavigate } from 'react-router-dom'
// import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store/type/RootState'
// import React from 'react'

// export function Navbar() {
//   const navigate = useNavigate()
//   const auth = useSelector((root: RootState) => root.auth)
//   const [navIsActive, setNavIsActive] = React.useState<any>("home")

//   const handleNavActive = (path: string, url: string) => {
//     setNavIsActive(path)
//     navigate(url)
//   }

//   console.log(navIsActive);
  

//   return (
//     <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
//       <Text fontWeight={"bold"} fontSize={"40px"} color={"green"}>
//         Circle
//       </Text>

//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => handleNavActive("home", "/")}
//         color={navIsActive === "home" ? "red" : "grey"}
//       >
//         <AiFillHome />
//         <Text> Home</Text>
//       </Button>

      
//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => handleNavActive("search", "/search")}
//         color={navIsActive === "search" ? "red" : "grey"}
//       >
//         <AiOutlineSearch />
//         <Text> Search</Text>
//       </Button>

//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => navigate(`/follow`)}
//       >
//         <AiOutlineHeart />
//         <Text> Follow</Text>
//       </Button>

//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => navigate(`/profile/${auth.id}`)}
//       >
//         <AiOutlineUser />
//         <Text> Profile</Text>
//       </Button>

//       <Button
//         bgColor={"green"}
//         borderRadius={"30px"}
//         color={"white"}
//         marginTop={"30px"}
//         colorScheme="green"
//       >
//         Create Post
//       </Button>
//     </Box>
//   )
// }

import { Box, Text, Button } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiOutlineUser, AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/type/RootState'
import React from 'react'

export function Navbar() {
  const { pathname } = useLocation();
  const auth = useSelector((root: RootState) => root.auth)

  const isActive = (path: string) => {
    return pathname === path ? "red" : "black";
  }

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
      <Text fontWeight={"bold"} fontSize={"40px"} color={"green"}>
        Circle
      </Text>

      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        color={isActive("/")}
      >
        <AiFillHome />
        <Link to="/">Home</Link>
      </Box>

      
      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        color={isActive("/search")}
        >
        <AiOutlineSearch />
        <Link to="/search">Search</Link>
      </Box>

      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        color={isActive("/follow")}>
        {pathname === "/follow" ? (<AiFillHeart />) : (<AiOutlineHeart />) }
        <Link to="/follow">Follow</Link>
      </Box>

      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        color={isActive(`/profile/${auth.id}`)}>
        <AiOutlineUser />
        <Link to={`/profile/${auth.id}`}>Profile</Link>
      </Box>

      <Button
        bgColor={"green"}
        borderRadius={"30px"}
        color={"white"}
        marginTop={"30px"}
        colorScheme="green"
      >
        Create Post
      </Button>
    </Box>
  )
}
