interface Register {
  name: string;
  email: string;
  password: string;
  confirmedPass: string;
}
export type { Register };

export interface NewPass {
  newPassword: string;
  confirmedPass: string;
}

export interface Stage2 {
  email: string;
}

export interface ChatItem {
  id: string;
  name: string;
  sub?: string;
  date?: string;
  avatar?: string;
  status?: string;
}

export interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  time?: string;  
}
