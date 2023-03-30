import Blog from "./Components/Blog";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./PopUps/SignUpForm";
import LogInForm from "./PopUps/LogInForm";
import SinglePostWrapper from "./Components/SinglePostWrapper";
import NewPostForm from "./PopUps/NewPostForm";
import PostListWrapper from "./Components/PostListWrapper";
import store from "./store";
import { Provider } from "react-redux";
import { initBackendApiClient } from "./Api/index";

const queryClient = new QueryClient();
initBackendApiClient(store)

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/posts/newpost" element={<NewPostForm />} />
            <Route path="/posts/:postUrl" element={<SinglePostWrapper />} />
            <Route path="/posts/all" element={<PostListWrapper />} />
          </Routes>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;