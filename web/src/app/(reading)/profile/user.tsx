import { auth } from "@/auth/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/utils/get-initials"

export async function User() {
  const { user } = await auth()

  if (!user) {
    return null
  }

  const memberSinceYear = new Date(user.createdAt).getFullYear()

  return (
    <div className="flex flex-col items-center gap-5">
      <Avatar size="lg">
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p className="font-bold text-xl leading-snug">{user.name}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          membro desde {memberSinceYear}
        </p>
      </div>
    </div>
  )
}
