import { useAuthStore } from "../store/useAuthstore.js";

const Navbar = () => {
  const {authUser} = useAuthStore();

  return (
    <div>
      Heyy
    </div>
  )
}

export default Navbar
