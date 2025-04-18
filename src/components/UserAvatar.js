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
  
/**
 * A dropdown menu that shows the user's avatar and lets them navigate to their
 * profile or log out.
 *
 * @param {{ name: string, imageUrl: string, onLogout: () => void }} props
 * @prop {string} name - The user's name, which will be used to generate an
 *     abbreviation if no image is provided. Defaults to "User".
 * @prop {string} imageUrl - The URL of the user's avatar image. Defaults to an
 *     empty string.
 * @prop {() => void} onLogout - A function to call when the user logs out.
 */
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
  