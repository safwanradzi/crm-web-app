import { Suspense } from 'react'
import { ClientAuthForm } from './client-auth-form'

export default function ClientLoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-100">
            <Suspense fallback={<div className="text-center">Loading portal...</div>}>
                <ClientAuthForm />
            </Suspense>
        </div>
    )
}
