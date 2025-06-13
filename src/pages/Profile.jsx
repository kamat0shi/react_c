import React, { useEffect, useState } from 'react';
import { TonConnect, TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';

const Profile = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Получаем Telegram данные
    // const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    // if (tgUser) {
    //   const { id, username } = tgUser;
    //   setUsername(username);
    //   setAvatarUrl(`https://6086-170-62-100-153.ngrok-free.app/avatar/${id}`);
    // }

    // Подключение кошелька
    const unsub = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        setWalletAddress(wallet.account.address);
      } else {
        setWalletAddress(null);
      }
    });
    return () => unsub();
  }, [tonConnectUI]);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>👤 Профиль</h1>

      {/* {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" style={styles.avatar} />
      )}
      <p>@{username}</p> */}

      <div style={styles.card}>
        <p><strong>Wallet:</strong> {walletAddress || 'Не подключён'}</p>
        <TonConnectButton />
      </div>
    </div>
  );
};

const TonConnectButton = () => {
  const [tonConnectUI] = useTonConnectUI();

  const connect = () => {
    tonConnectUI.connectWallet();
  };

  return (
    <button onClick={connect} style={styles.button}>
      🔗 Подключить TON Wallet
    </button>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#0d1117',
    color: '#fff',
    padding: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  card: {
    backgroundColor: '#161b22',
    padding: '20px',
    borderRadius: '12px',
    display: 'inline-block',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Profile;
