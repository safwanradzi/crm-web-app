
import { loginClient, signupClient } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ClientLoginPage({ searchParams }: { searchParams: Promise<{ message?: string, error?: string }> }) {
    const { message, error } = await searchParams
    return (
        <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-100">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Client Portal</CardTitle>
                    <CardDescription className="text-center">
                        Login to view your projects and invoices.
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
                                    placeholder="your@email.com"
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
                            {message && (
                                <div className="text-sm p-2 bg-green-100 text-green-700 rounded border border-green-200">
                                    {message}
                                </div>
                            )}
                            {error && (
                                <div className="text-sm p-2 bg-red-100 text-red-700 rounded border border-red-200">
                                    {error}
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button form="login-form" formAction={loginClient} className="w-full">Sign in</Button>
                    <Button form="login-form" formAction={signupClient} variant="outline" className="w-full">
                        First time? Sign up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
