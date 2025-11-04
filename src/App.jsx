import Footer from "./component/Footer";
import Header from "./component/Header";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep">
      <Header />
      <main className="p-8 h-screen">
        <h1 className="text-3xl font-bold text-white">
          Welcome to Cyber Nexus 🚀
        </h1>
        {
          //Hna Les Components Guys
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
/*<Routes>
      <Route path="/" element={<h1>bdina</h1>}/>
      <Route path="/b" element={<h1>bdina2</h1>}/>
    </Routes>
    */
/* <div className='flex-auto  backdrop-filter backdrop-blur-lg bg-opacity-0 bg-clip-padding'>
         Welcome To Ha-Softwares 
         you have a business , you are entreprenor ,you need website 
       </div>
      */
