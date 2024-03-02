import { useNavigate } from "@solidjs/router";
import { View } from "../components/view";
import { auxyApi } from "../services";

export function HomeView() {
  const navigate = useNavigate();

  return (
    <View>
      <h1>music n shiiii</h1>
      <button
        onClick={() => {
          auxyApi.client.auth.signOut();
          navigate("/auth/sign-in");
        }}
      >
        Sign Out
      </button>
    </View>
  );
}
