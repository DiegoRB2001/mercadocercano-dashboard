import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
