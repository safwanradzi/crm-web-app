
import { ProfileForm } from './profile-form'
import { getProfile } from './actions'

export default async function SettingsPage() {
    const profile = await getProfile()

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your company profile and preferences.
                </p>
            </div>
            <ProfileForm profile={profile} />
        </div>
    )
}
