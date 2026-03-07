"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { setUser, setProfile, setIsLoading } = useAuthStore();

	useEffect(() => {
		const initAuth = async () => {
			setIsLoading(true);
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (session?.user) {
					setUser(session.user);
					// Fetch profile
					const { data: profile } = await supabase
						.from("profiles")
						.select("*")
						.eq("id", session.user.id)
						.single();
					setProfile(profile);
				}
			} catch (error) {
				console.error("Error initializing auth:", error);
			} finally {
				setIsLoading(false);
			}
		};

		initAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (session?.user) {
				setUser(session.user);
				const { data: profile } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", session.user.id)
					.single();
				setProfile(profile);
			} else {
				setUser(null);
				setProfile(null);
			}
			setIsLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [setUser, setProfile, setIsLoading]);

	return <>{children}</>;
}
