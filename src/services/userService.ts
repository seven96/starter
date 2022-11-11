interface User {
    id: number;
    name: string;
    email: string;
}

export function getUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}