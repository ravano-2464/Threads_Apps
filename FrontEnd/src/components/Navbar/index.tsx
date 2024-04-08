// import { Box, Text, Button, } from '@chakra-ui/react'
// import { Link, useNavigate } from 'react-router-dom'
// import { faHome, faSearch, faHeart, faUser } from 'react-icons/ai'
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
//         color={navIsActive === "home" ? "red" : "white"}
//       >
//         <faHome />
//         <Text> Home</Text>
//       </Button>

      
//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => handleNavActive("search", "/search")}
//         color={navIsActive === "search" ? "red" : "white"}
//       >
//         <faSearch />
//         <Text> Search</Text>
//       </Button>

//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => navigate(`/follow`)}
//       >
//         <faHeart />
//         <Text> Follow</Text>
//       </Button>

//       <Button 
//         justifyContent={"flex-start"} 
//         variant='ghost' 
//         gap={2} 
//         fontSize={"lg"}
//         onClick={() => navigate(`/profile/${auth.id}`)}
//       >
//         <faUser />
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
import { faHome, faSearch, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux'
import { RootState } from '@/store/type/RootState'
import React from 'react'

export function Navbar() {
  const { pathname } = useLocation();
  const auth = useSelector((root: RootState) => root.auth)

  const isActive = (path: string) => {
    return pathname === path ? "white" : "bold";
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
        fontWeight={pathname === "/" ? "bold" : "normal"}
      >
        <FontAwesomeIcon icon={faHome} color="white" />
        <Link to="/" style={{ color: "white" }}>Home</Link>
      </Box>
      
      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        color={isActive("/search")}
        fontWeight={pathname === "/search" ? "bold" : "normal"}
        >
        <FontAwesomeIcon icon={faSearch} color="white" />
        <Link to="/search" style={{ color: "white" }}>Search</Link>
      </Box>

      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        fontWeight={pathname === "/follow" ? "bold" : "normal"}
        color={isActive("/follow")}>
        <FontAwesomeIcon icon={faHeart} color="white" />
        <Link to="/follow" style={{ color: "white" }}>Follow</Link>
      </Box>

      <Box 
        display={"flex"}
        alignItems={"center"}
        mt={2}
        gap={2}
        _hover={{textDecoration: "underline"}} 
        fontSize={"xl"}
        fontWeight={pathname === `/profile/${auth.id}` ? "bold" : "normal"}
        color={isActive(`/profile/${auth.id}`)}>
        <FontAwesomeIcon icon={faUser} color="white" />
        <Link to={`/profile/${auth.id}`} style={{ color: "white" }}>Profile</Link>
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