export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}
