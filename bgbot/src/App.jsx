import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
const Main = React.lazy(() => import("./pages/Main"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const List = React.lazy(() => import("./pages/List"));
const Users = React.lazy(() => import("./pages/Users"));
const Games = React.lazy(() => import("./pages/Games"));

// import Members from "./pages/Members";
// import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
// import List from "./pages/List";
import { useState, useEffect } from "react";
import useFetch2 from "./hooks/UseFetch2";
import { Suspense } from "react";

function App() {
  // const [data, fetchData] = useFetch2();

  // useEffect(() => {
  //   fetchData("https://jsonplaceholder.typicode.com/comments");
  // }, []);
  return (
    // <>
    //   {data.map((item) => (
    //     <div>{JSON.stringify(item)}</div>
    //   ))}
    // </>

    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="groups/:id" element={<Groups />} />
          <Route path="list" element={<List />} />
          <Route path="games" element={<Games />} />
          <Route path="users" element={<Users />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
