"use server";
import AuthTabs from "@components/AuthTabs";
import AuthContextProvider from "@contexts/AuthContext";

export default async function AuthPage() {

    return (
        <AuthContextProvider>
            <AuthTabs />
        </AuthContextProvider>
    );
}