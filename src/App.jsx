// import React, { useEffect } from 'react';
// import Profile from './pages/Profile';

// function App() {
//   useEffect(() => {
//     const tg = window.Telegram?.WebApp;

//     if (tg?.initDataUnsafe?.user) {
//       const { id, username } = tg.initDataUnsafe.user;
//       console.log("Telegram user:", { id, username });

//       // отправляем данные на бекенд
//       fetch("https://6086-170-62-100-153.ngrok-free.app/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           telegram_id: id,
//           username: username,
//           avatar_url: null
//         })
//       })
//         .then(res => res.json())
//         .then(data => console.log("Backend response:", data))
//         .catch(err => console.error("Register error:", err));
//     } else {
//       console.log("Not opened inside Telegram WebApp");
//     }
//   }, []);

//   return <Profile />;
// }

// export default App;




// import React, { useEffect, useState } from 'react';
// import Profile from './pages/Profile';

// function App() {
//   const [tgData, setTgData] = useState(null);

//   useEffect(() => {
//     const tg = window.Telegram?.WebApp;
//     if (tg) tg.ready(); 
//     if (tg?.initDataUnsafe?.user) {
//       const { id, username } = tg.initDataUnsafe.user;
//       setTgData({ id, username });

//       fetch("https://6086-170-62-100-153.ngrok-free.app/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           telegram_id: id,
//           username: username,
//           avatar_url: null
//         })
//       })
//         .then(res => res.json())
//         .then(data => console.log("Backend response:", data))
//         .catch(err => console.error("Register error:", err));
//     } else {
//       setTgData({ error: "Not opened inside Telegram WebApp" });
//     }
//   }, []);

//   return (
//     <div style={{ color: "white", padding: "20px", backgroundColor: "#111", minHeight: "100vh" }}>
//       <h2>Telegram WebApp Debug Info:</h2>
//       {tgData ? (
//         tgData.error ? (
//           <p>{tgData.error}</p>
//         ) : (
//           <div>
//             <p><strong>ID:</strong> {tgData.id}</p>
//             <p><strong>Username:</strong> @{tgData.username}</p>
//           </div>
//         )
//       ) : (
//         <p>Загрузка...</p>
//       )}

//       <hr style={{ margin: "30px 0", borderColor: "#333" }} />

//       {/* Основной интерфейс */}
//       <Profile />
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import Profile from './pages/Profile';

// function App() {
//   const [tgData, setTgData] = useState(null);
//   const [rawInitData, setRawInitData] = useState(null);

//   useEffect(() => {
//     if (window.Telegram?.WebApp) {
//       window.Telegram.WebApp.expand(); // Расширяем WebApp
//     }
//     const tg = window.Telegram?.WebApp;
//     if (tg) tg.ready();

//     if (tg?.initDataUnsafe) {
//       const { user } = tg.initDataUnsafe;
//       setTgData(user ? { id: user.id, username: user.username } : { error: "User not found" });
//       setRawInitData(tg.initDataUnsafe); // сохраняем весь объект

//       // Можно отправить на бэк как раньше, если нужно
//     } else {
//       setTgData({ error: "Not opened inside Telegram WebApp" });
//     }
//   }, []);

//   return (
//     <div style={{ color: "white", padding: "20px", backgroundColor: "#111", minHeight: "100vh" }}>
//       <h2>Telegram WebApp Debug Info:</h2>
//       {tgData ? (
//         tgData.error ? (
//           <p>{tgData.error}</p>
//         ) : (
//           <div>
//             <p><strong>ID:</strong> {tgData.id}</p>
//             <p><strong>Username:</strong> @{tgData.username}</p>
//           </div>
//         )
//       ) : (
//         <p>Загрузка...</p>
//       )}

//       <hr style={{ margin: "30px 0", borderColor: "#333" }} />

//       {rawInitData && (
//         <div>
//           <h3>initDataUnsafe:</h3>
//           <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
//             {JSON.stringify(rawInitData, null, 2)}
//           </pre>
//         </div>
//       )}

//       <hr style={{ margin: "30px 0", borderColor: "#333" }} />
//       <Profile />
//     </div>
//   );
// }

// export default App;


/// <reference path="./types.d.ts" />
import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    tg.ready();
    tg.expand();
    if (tg.initDataUnsafe.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Telegram WebApp</h1>
      {user ? (
        <>
          <p>ID: {user.id}</p>
          <p>Имя: {user.first_name}</p>
          {user.username && <p>Username: @{user.username}</p>}
          {user.photo_url && (
            <img src={user.photo_url} alt="avatar" width={100} />
          )}
        </>
      ) : (
        <p>Пользователь не найден</p>
      )}
    </div>
  );
}

export default App;
