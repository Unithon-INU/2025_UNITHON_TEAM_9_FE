// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import SelectCloth from './pages/SelectCloth';
import SelectModel from './pages/SelectModel';
import ResultLoading from "./pages/ResultLoading.tsx";
import Result from "./pages/Result.tsx";

function App() {
    return (
        <Router basename="/chakbootlounge">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/selectcloth" element={<SelectCloth />} />
                <Route path="/selectmodel" element={<SelectModel />} />
                <Route path="/resultloading" element={<ResultLoading />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;