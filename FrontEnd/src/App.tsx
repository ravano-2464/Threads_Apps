import { RootState } from "./store/type/RootState"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { API, setAuthToken } from "./libs/api"
import { useEffect, useState } from "react"
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer"
import { ChakraProvider } from "@chakra-ui/react"
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Main from "./layout/Main"
import Login from "./pages/Login"
import DetailThread from "./pages/DetailThread"
import ListUser from "./pages/ListUser"
import Profile from "./pages/Profile"
import Follow from "./pages/Follow"

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function testNotification() {
    toast.info(
      <p>
        New threads are available! <a href="/">Check it out!</a>
      </p>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }

  async function authCheck() {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      dispatch(AUTH_CHECK(response.data.user))
      setIsLoading(false)
    } catch (err) {
      dispatch(AUTH_ERROR())
      setIsLoading(false)
      navigate('/auth/login')
    }
  }  

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/api/v1/notifications");

    async function getRealtimeData(data: any) {
      console.log("Ini datanya cuy:", data);
      testNotification();
    }

    sse.onopen = (e) => console.log("berhasil connect ! : ", e);
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      console.log("Error SSE bro!");
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  useEffect(() => {
    if (localStorage.token) {
      authCheck()
    } else {
      setIsLoading(false)
    }
  }, [])

  function IsNotLogin() {
    if (!auth.username) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {
        isLoading ? null : 
          <ChakraProvider>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route
                path="/"
                element={
                  <Main>
                    <Home />
                  </Main>
                }
              />
              
              <Route
                path="/thread/:id"
                element={
                  <Main>
                    <DetailThread />
                  </Main>
                }
              />

              <Route
                path="/search"
                element={
                  <Main>
                    <ListUser />
                  </Main>
                }
              />

              <Route
                path="/follow"
                element={
                  <Main>
                    <Follow />
                  </Main>
                }
              />

              <Route
                path="/profile/:id"
                element={ <Profile /> }
              />
            </Route> 
            
            <Route path="/" element={<IsLogin />}>
              <Route path="/auth/register" element={ <Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>
          </Routes>
        </ChakraProvider>
      }
    </>
    
  )
}

export default App


