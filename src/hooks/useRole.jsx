import { use } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role = "user", isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return [role, isRoleLoading];
};
export default useRole;
