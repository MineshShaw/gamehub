import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Router } from "next/router"
  
  export function UserAvatar({ name = "User", imageUrl = "", onLogout }) {
    const getInitials = (fullName) => {
      return fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="text-indigo-700">{getInitials(name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mt-2" align="end">
          <DropdownMenuItem onSelect={() => Router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  