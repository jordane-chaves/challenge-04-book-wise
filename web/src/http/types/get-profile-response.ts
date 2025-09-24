export interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
    avatar_url: string | null
  }
}
