import { A } from "@solidjs/router";
import { View } from "@/components/view";
import { auxyApi } from "@/services";
import { Button, Form } from "@/components";

export function HomeView() {
	return (
		<View>
			<h1>music n shiiii</h1>
			<A href="/library">Library</A>
			<Form action={`${auxyApi.BASE_URL}/auth/sign-out`}>
				<Button type="submit">Sign Out</Button>
			</Form>
		</View>
	);
}
