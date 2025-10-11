export interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
}
