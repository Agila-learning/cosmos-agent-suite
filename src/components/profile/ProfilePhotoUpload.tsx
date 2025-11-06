import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProfilePhotoUploadProps {
  name: string;
  currentAvatar?: string;
  onUpdate?: (newAvatar: string) => void;
}

export const ProfilePhotoUpload = ({ name, currentAvatar, onUpdate }: ProfilePhotoUploadProps) => {
  const { toast } = useToast();
  const [avatar, setAvatar] = useState(currentAvatar || "");

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setAvatar(newAvatar);
        onUpdate?.(newAvatar);
        toast({
          title: "Profile Photo Updated",
          description: "Your profile photo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-primary/20">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-transparent border-2 border-primary text-foreground text-2xl sm:text-3xl">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <label 
        htmlFor="photo-upload" 
        className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover-scale shadow-lg"
      >
        <Camera className="h-4 w-4" />
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
