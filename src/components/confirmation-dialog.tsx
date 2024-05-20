import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

interface LogoutDialogProps {
  onLogout: () => void; // Function to handle logout
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    onLogout(); // Call the provided logout function
    setIsOpen(false); // Close the dialog
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button className="bg-sky-200 text-black px-4 py-2 rounded-full">
            Logout
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 text-center">
            <AlertDialogTitle className="text-2xl font-semibold text-gray-900">
              Are you sure you want to logout?
            </AlertDialogTitle>
          </div>
          <div className="px-6 py-4 flex justify-center space-x-4">
            <AlertDialogAction
              className="px-4 py-2 bg-red-500 text-white rounded-full"
              onClick={logout}
            >
              Yes
            </AlertDialogAction>
            <AlertDialogAction
              className="px-4 py-2 bg-gray-300 text-black rounded-full"
              onClick={() => setIsOpen(false)} // Close the dialog without logging out
            >
              No
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutDialog;
