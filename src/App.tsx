//amanha 05/05/2022 15:00, 15:30, presencial, cti Caio, Recebi ligação de funcionário da PGE para entrevista de emprego
import { useState } from 'react'
import { Dashboard } from "./components/Dashboard/indesx";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions'; 

import { GlobalStyle } from "./styles/global";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    
    function handleOpenNewTransactionOpen() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCLoseNewTransactionOpen() {
        setIsNewTransactionModalOpen(false);
    }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionOpen} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCLoseNewTransactionOpen}
      />
      
      <GlobalStyle />
    </TransactionsProvider>
  );
}