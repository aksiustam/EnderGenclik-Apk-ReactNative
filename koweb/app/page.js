import getAllUser from "./actions/User/getAllUser";
import { getCurrentUser } from "./actions/getCurrentUser";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Home/Login";
import Sidebar from "./components/Layout/Sidebar";

export default async function Home() {
  const User = await getCurrentUser();
  const user = await getAllUser();
  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>
          <HomePage user={user} />
        </main>
      </Sidebar>
    );
  } else {
    return (
      <main>
        <Login />
      </main>
    );
  }
}
