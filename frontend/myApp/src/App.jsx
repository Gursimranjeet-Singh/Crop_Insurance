import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import Main from './component/Main/Main'

import { connectWallet } from './conf/Wallet/walletConfig'


import './App.css'
import { useEffect } from 'react'

function App() {
  return (
    <>

      <Header />
      <Main />
      <Footer />
    </>
  )
};

export default App
