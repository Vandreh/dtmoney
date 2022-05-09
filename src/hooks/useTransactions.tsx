//Criação de contexto para poder ser acessado de qualquer parte da aplicação este contexto, está sendo chamado em App.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/app";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput { title: string; amount: number; type: string; category: string; }
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>; //outra forma de cirar interface selecionando os elementos desejados

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //outra forma de criar interface omitindo os elementos nao desejados


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => { //fetch('/transactions')
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions)) //console.log(response.data)) //.then(response => response.json())
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data; 

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction}}>
            { children }
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}