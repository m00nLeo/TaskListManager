import { forwardRef, ReactNode, Ref } from "react";
import { ToastContainer } from "react-toastify";

// Define prop types
interface CardProps {
  children: ReactNode;
  fluid?: boolean;
  topElement?: Ref<HTMLDivElement>;
}

// Use forwardRef with the defined props
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, fluid = false, topElement }, ref) => {
    return (
      <div
        ref={ref || topElement}
        className={`h-screen w-screen py-20 flex justify-center bg-gradient-to-br from-[#FFED46] to-[#FF7EC7] overflow-x-hidden ${
          fluid ? "relative" : ""
        }`}
      >
        <div
          className={`container mx-auto max-w-xs md:max-w-xl ${
            fluid
              ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          } bg-gray-200/80 px-10 py-4 rounded-lg h-fit shadow-2xl`}
        >
          {children}
        </div>

        {/* Toast Notification */}
        {fluid && (
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        )}
      </div>
    );
  }
);

export default Card;
