'use client';

import useWeb3 from '@/hooks/useWeb3';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Transaction } from '@solana/web3.js';
import WalletMultiButtonClient from './WalletMultiButtonClient';

export default function WalletModal() {
  const web3 = useWeb3();

  const handleButtonConnect = () => {
    fetch(`/api/personality/${web3.wallet.publicKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        age: 30,
        hobbies: ['reading', 'gaming'],
        message: 'Hello, world!',
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed with status ${res.status}: ${errText}`);
        }

        const data = await res.json();
        console.log('data', data);

        await web3.wallet.sendTransaction(
          Transaction.from(Buffer.from(data.data, 'base64')),
          web3.connection,
        );
      })
      .catch((err) => {
        console.error('❌ Error sending transaction:', err.message);
      });
  };

  return (
    <WalletModalProvider>
      <button
        onClick={() => handleButtonConnect()}
        className="px-4 py-2 rounded-md font-semibold text-sm bg-purple-500 text-white my-2 hover:bg-purple-600 transition-all duration-300 cursor-pointer"
      >
        Connect Wallet
      </button>
      <WalletMultiButtonClient />
    </WalletModalProvider>
  );
}
