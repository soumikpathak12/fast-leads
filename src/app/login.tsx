import React, { useState } from "react";
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { app } from "./firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function Login() {
  const provider = new GoogleAuthProvider();
  const router = useRouter()
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(app)

  const onSubmit = () => {
    signInWithEmailAndPassword(auth, 'test@mymail.com', 'Password')
      .then((userCredential) => {
        // Signed up 
        router.push('/dashboard');
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const signUp = () =>{
    
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/assets/Illustration.svg"
          alt="Image"
          width="1920"
          height="0"
          className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

              </div>
              <Input id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button type="submit" className="w-full" onClick={onSubmit}>
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            {/* <Link href="#" className="underline">
              Sign up
            </Link> */}

            <Dialog>
              <DialogTrigger asChild>
                <Link href="#" className="underline">
                  Sign up
                </Link>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">Sign Up</DialogTitle>
                  {/* <DialogDescription>
                    Fill your details below to Sign up with the portal.
                  </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>
                      Email
                    </Label>
                    <Input

                      className="col-span-3"
                      type="email"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>
                      Password
                    </Label>
                    <Input
                      className="col-span-3"
                      type="password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

    </div>
  )
}
