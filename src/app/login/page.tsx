
import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage({ searchParams }: { searchParams: { message?: string, error?: string } }) {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4 bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="login-form">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            {searchParams?.message && (
                                <div className="text-sm p-2 bg-green-100 text-green-700 rounded border border-green-200">
                                    {searchParams.message}
                                </div>
                            )}
                            {searchParams?.error && (
                                <div className="text-sm p-2 bg-red-100 text-red-700 rounded border border-red-200">
                                    {searchParams.error}
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button form="login-form" formAction={login} className="w-full">Sign in</Button>
                    <Button form="login-form" formAction={signup} variant="outline" className="w-full">Sign up</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
