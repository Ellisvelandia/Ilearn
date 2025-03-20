export interface Session {
  user: {
    id: string;
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export function auth(): Promise<Session | null>; 