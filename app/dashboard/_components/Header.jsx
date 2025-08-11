"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
    const path = usePathname();
    const [walletAddress, setWalletAddress] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                    }
                } catch (error) {
                    console.error('Connection check failed:', error);
                }
            }
        };
        checkConnection();
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];
                setWalletAddress(address);
                await navigator.clipboard.writeText(address);
                alert('Wallet address copied to clipboard!');
            } catch (error) {
                console.error('Failed to connect to MetaMask wallet:', error);
            }
        } else {
            alert('Please install the MetaMask wallet extension.');
        }
    };

    const truncateAddress = (address) => {
        if (typeof address === 'string' && address.length > 8) {
            return `${address.slice(0, 4)}...${address.slice(-4)}`;
        }
        return 'Wallet Address'; 
    };

    return (
        <div className='flex flex-col md:flex-row p-4 items-center justify-between bg-gray-950 shadow-sm gap-4'>
            <Link href="/" className='flex items-center cursor-pointer'>
                <Image src="/log.png" alt="Logo" width={42} height={42} />
                <span className='text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors mb-2 ml-2'>
                Somania MiniHub
                </span>
            </Link>

          
            <ul className='flex gap-6 ml-auto'>
                <Link href={"/dashboard"}>
                    <li className={`text-gray-400 font-bold hover:text-purple-400 transition-all cursor-pointer
                    ${path === '/dashboard' && 'text-purple-400 font-bold'}
                    `}>Games</li>
                </Link>
                <Link href={"/dashboard/agent"}>
                    <li className={`text-gray-400 font-bold hover:text-purple-400 transition-all cursor-pointer
                    ${path === '/dashboard/agent' && 'text-purple-400 font-bold'}
                    `}>Somania Agent</li>
                </Link>
                <Link href={"/dashboard/leaderboard"}>
                    <li className={`text-gray-400 font-bold hover:text-purple-400 transition-all cursor-pointer
                    ${path === '/dashboard/leaderboard' && 'text-purple-400 font-bold'}
                    `}>LeaderBoard</li>
                </Link>
                <Link href={"/dashboard/telegram"}>
                    <li className={`text-gray-400 font-bold hover:text-purple-400 transition-all cursor-pointer
                    ${path === '/dashboard/telegram' && 'text-purple-400 font-bold'}
                    `}>Telegram</li>
                </Link>
                <Link href={"/dashboard/upgrade"}>
                    <li className={`text-gray-400 font-bold hover:text-purple-400 transition-all cursor-pointer
                    ${path === '/dashboard/upgrade' && 'text-purple-400 font-bold'}
                    `}>Pricing</li>
                </Link>
            </ul>

           
            <div className="flex items-center gap-4">
                <button 
                    onClick={connectWallet} 
                    className='ml-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25'
                >
                    {walletAddress ? truncateAddress(walletAddress) : 'Connect MetaMask'}
                </button>

               
            </div>
        </div>
    );
}

export default Header;