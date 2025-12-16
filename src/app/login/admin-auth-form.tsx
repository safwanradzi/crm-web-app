'use client'

import { useActionState, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loginAdmin, signupAdmin, forgotPasswordAdmin } from './actions'
import { ActionState } from './actions'
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
import { Loader2, ShieldAlert } from 'lucide-react'

// Initial state for actions
const initialState: ActionState = {
    message: '',
    error: '',
    success: false
}

export function AdminAuthForm() {
    const searchParams = useSearchParams()
    const errorParam = searchParams.get('error')
    const messageParam = searchParams.get('message')

    // Login State
    const [loginState, loginAction, isLoginPending] = useActionState(loginAdmin, initialState)

    // Signup State
    const [signupOpen, setSignupOpen] = useState(false)
    const [signupState, signupAction, isSignupPending] = useActionState(signupAdmin, initialState)

    // Forgot Password State
    const [forgotOpen, setForgotOpen] = useState(false)
    const [forgotState, forgotAction, isForgotPending] = useActionState(forgotPasswordAdmin, initialState)

    // Close Modals on Success
    useEffect(() => {
        if (signupState?.success) {
            setSignupOpen(false)
            alert(signupState.message || "Admin account created! Check email.")
        }
    }, [signupState])

    useEffect(() => {
        if (forgotState?.success) {
            setForgotOpen(false)
            alert(forgotState.message || "Reset link sent!")
        }
    }, [forgotState])

    return (
        <Card className="w-full max-w-sm shadow-xl border-slate-200">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Admin Console</CardTitle>
                <CardDescription className="text-center">
                    Restricted access. Authorized personnel only.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={loginAction} id="login-form">
                    <div className="grid gap-4">
                        {/* Global Errors */}
                        {(loginState?.error || errorParam) && (
                            <div className="text-sm p-3 bg-red-50 text-red-600 rounded-md border border-red-200 flex items-start gap-2">
                                <ShieldAlert className="h-4 w-4 mt-0.5" />
                                <span>{loginState?.error || errorParam}</span>
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
                                placeholder="admin@company.com"
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
                <Button form="login-form" type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={isLoginPending}>
                    {isLoginPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in to Dashboard"}
                </Button>

                {/* Signup Dialog Trigger */}
                <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            Register new admin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Register Admin</DialogTitle>
                            <DialogDescription>
                                Create a new administrator account.
                                <br /><span className="text-xs text-red-600 font-bold uppercase tracking-wider">Warning: Whitelist Enforced</span>
                            </DialogDescription>
                        </DialogHeader>
                        <form action={signupAction} className="grid gap-4 py-4">
                            {signupState?.error && (
                                <div className="text-sm p-3 bg-destructive/10 text-destructive rounded-md">
                                    {signupState.error}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input id="signup-email" name="email" type="email" required placeholder="admin@company.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={8}
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Strong password required.
                                </p>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isSignupPending}>
                                    {isSignupPending ? "Verifying..." : "Create Admin Account"}
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
                                Enter your admin email to receive a reset link.
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
                                <Input id="reset-email" name="email" type="email" required placeholder="admin@company.com" />
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
