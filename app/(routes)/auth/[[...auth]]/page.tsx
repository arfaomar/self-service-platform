"use server";
import AuthTabs from "@components/clerk/AuthTabs";
import AuthContextProvider from "@contexts/AuthContext";

export default async function AuthPage() {

    return (
        <AuthContextProvider>
            <AuthTabs />
        </AuthContextProvider>
    );
}