'use client'

import { useActionState, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionState, loginClient, signupClient, forgotPasswordClient } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

// Initial state for actions
const initialState: ActionState = {
    message: '',
    error: '',
    success: false
}

export function ClientAuthForm() {
    const searchParams = useSearchParams()
    const errorParam = searchParams.get('error')
    const messageParam = searchParams.get('message')

    // Login State
    const [loginState, loginAction, isLoginPending] = useActionState(loginClient, initialState)

    // Signup State
    const [signupOpen, setSignupOpen] = useState(false)
    const [signupState, signupAction, isSignupPending] = useActionState(signupClient, initialState)

    // Forgot Password State
    const [forgotOpen, setForgotOpen] = useState(false)
    const [forgotState, forgotAction, isForgotPending] = useActionState(forgotPasswordClient, initialState)

    // Close Modals on Success
    useEffect(() => {
        if (signupState?.success) {
            setSignupOpen(false)
            alert(signupState.message || "Account created! Please check your email.")
        }
    }, [signupState])

    useEffect(() => {
        if (forgotState?.success) {
            setForgotOpen(false)
            alert(forgotState.message || "Reset link sent!")
        }
    }, [forgotState])

    return (
        <Card className="w-full max-w-sm shadow-lg animate-in fade-in zoom-in-95 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Client Portal</CardTitle>
                <CardDescription className="text-center">
                    Secure access for trusted partners.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={loginAction} id="login-form">
                    <div className="grid gap-4">
                        {/* Global Errors */}
                        {(loginState?.error || errorParam) && (
                            <div className="text-sm p-3 bg-red-50 text-red-600 rounded-md border border-red-200">
                                {loginState?.error || errorParam}
                            </div>
                        )}
                        {(messageParam) && (
                            <div className="text-sm p-3 bg-green-50 text-green-600 rounded-md border border-green-200">
                                {messageParam}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <button
                                    type="button"
                                    onClick={() => setForgotOpen(true)}
                                    className="text-xs text-brand-indigo hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" name="remember" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
                <Button form="login-form" type="submit" className="w-full" disabled={isLoginPending}>
                    {isLoginPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in"}
                </Button>

                {/* Signup Dialog Trigger */}
                <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            First time? Sign up
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Activate Account</DialogTitle>
                            <DialogDescription>
                                Enter your details to activate your client portal access.
                                <br /><span className="text-xs text-amber-600 font-semibold">Note: Your email must be pre-approved by admin.</span>
                            </DialogDescription>
                        </DialogHeader>
                        <form action={signupAction} className="grid gap-4 py-4">
                            {signupState?.error && (
                                <div className="text-sm p-3 bg-destructive/10 text-destructive rounded-md">
                                    {signupState.error}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="signup-name">Full Name</Label>
                                <Input id="signup-name" name="name" required placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="signup-phone">Phone Number</Label>
                                <Input id="signup-phone" name="phone" required placeholder="+60 12-345 6789" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input id="signup-email" name="email" type="email" required placeholder="Same as invited email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={8}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
                                </p>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isSignupPending}>
                                    {isSignupPending ? "Activating..." : "Create Account"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Forgot Password Dialog */}
                <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                                Enter your email to receive a password reset link.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={forgotAction} className="grid gap-4 py-4">
                            {forgotState?.error && (
                                <div className="text-sm p-3 bg-destructive/10 text-destructive rounded-md">
                                    {forgotState.error}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="reset-email">Email</Label>
                                <Input id="reset-email" name="email" type="email" required placeholder="name@company.com" />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isForgotPending}>
                                    {isForgotPending ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>
    )
}
