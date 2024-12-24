"use client";

import { useAuthContext } from "@contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import SignInTab from "@components/clerk/SignInTab";
import SignUpTab from "@components/clerk/SignUpTab";

export default function AuthTabs() {
    const { activeTab, setActiveTab } = useAuthContext();

    return (
        <div className="grid w-full grow items-center px-4 sm:justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-96">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                    <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="sign-in">
                    <SignInTab />
                </TabsContent>
                <TabsContent value="sign-up">
                    <SignUpTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}