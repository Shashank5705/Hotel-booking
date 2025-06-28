import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {

    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            // Instead of invalidating the query which causes a refetch,
            // directly set the query data to indicate the user is not logged in
            queryClient.setQueryData("validateToken", null);
            showToast({ message: "Signed out!", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    });

    const handleClick = () => {
        mutation.mutate()
    }

  return (
    <button 
        onClick={handleClick}
        className="bg-white text-amber-400 px-3 rounded-xl shadow-xl px-4 py-2 font-bold hover:bg-gray-200">
            Sign Out
        </button>
  )
}

export default SignOutButton;