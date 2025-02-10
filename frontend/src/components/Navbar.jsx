import { useAuthStore } from "../store/useAuthstore.js";
import '../index.css'

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <div>
      <div className="bg-custom-blue !important text-white text-4xl p-6">
      Tailwind is WORKING! 🎉
    </div>
    </div>
  );
};

export default Navbar;
