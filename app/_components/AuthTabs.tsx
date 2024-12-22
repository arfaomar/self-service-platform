"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import SignInTab from "@components/SignInTab";
import SignUpTab from "@components/SignUpTab";

export default function AuthTabs() {
    return (
        <div className="grid w-full grow items-center px-4 sm:justify-center">
            <Tabs defaultValue="sign-in" className="w-full sm:w-96">
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
