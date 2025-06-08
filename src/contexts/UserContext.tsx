import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  name: string;
  avatar: string;
  level: number;
  characterName: string;
}

interface UserContextData {
  user: User;
  updateUser: (data: Partial<User>) => void;
  updateCharacterName: (name: string) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('@MundoMio:user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    
    return {
      name: '',
      avatar: 'https://thumbs.dreamstime.com/z/d-desenho-animado-menino-cabeludo-vermelho-sarado-%C3%B3culos-de-rosto-em-fundo-branco-uma-crian%C3%A7a-anos-com-cabelo-d%C3%A1-sarro-aos-281980474.jpg',
      level: 1,
      characterName: 'Babi'
    };
  });
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:user', JSON.stringify(user));
  }, [user]);
  
  const updateUser = (data: Partial<User>) => {
    setUser(prev => ({ ...prev, ...data }));
  };
  
  const updateCharacterName = (name: string) => {
    setUser(prev => ({ ...prev, characterName: name }));
  };
  
  return (
    <UserContext.Provider value={{ user, updateUser, updateCharacterName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);