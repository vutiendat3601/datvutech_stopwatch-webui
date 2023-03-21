import './App.css';
import MainLayout from './layouts/main-layout/main-layout.component';
import GlobalStyles from './components/global-styles/global-styles.component';

function App() {
    return (
        <GlobalStyles>
            <MainLayout />
        </GlobalStyles>
    );
}

export default App;
